import { create } from 'zustand';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { chartData, chartOptions } from '../utils/defaultChartValues';
import supabase from '../config/supabaseClient';

const initialValues = {
  cardValues: {
    diets: 0,
    exercises: 0,
    users: 0,
  },
  lineChartValues: {
    series: chartData.series,
    options: chartOptions,
  },
  isLoading: false,
};

const useDashboardStore = create((set, get) => ({
  ...initialValues,

  getCardValues: async () => {
    set({ isLoading: true });

    try {
      const [
        { count: dietsCount, error: dietsError },
        { count: usersCount, error: usersError },
        { count: exercisesCount, error: exercisesError },
      ] = await Promise.all([
        supabase.from('diet_plans').select('*', { count: 'exact', head: true }),
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('exercises').select('*', { count: 'exact', head: true }),
      ]);

      if (dietsError || usersError || exercisesError) {
        throw new Error(
          dietsError?.message || usersError?.message || exercisesError?.message
        );
      }

      set({
        isLoading: false,
        cardValues: {
          diets: dietsCount,
          users: usersCount,
          exercises: exercisesCount,
        },
      });
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },

  updateLineChart: async (timePeriod, date) => {
    set({ isLoading: true });

    try {
      const { data: fetchedData, error } = await supabase
        .from('users')
        .select('created_at')
        .gte('created_at', date);

      if (error) throw new Error(error.message);

      const groupedData = {};
      fetchedData.forEach((row) => {
        const date = dayjs(row.created_at);
        let key;
        switch (timePeriod) {
          case 1:
            key = date.format('DD MMM');
            break;
          case 2:
            const startOfWeek = dayjs(row.created_at).startOf('week');
            const endOfWeek = dayjs(row.created_at).endOf('week');
            key = `${startOfWeek.format('MM/DD/YYYY')} - ${endOfWeek.format(
              'MM/DD/YYYY'
            )}`;
            break;
          case 3:
            key = date.format('MMMM YYYY');
            break;
          default:
            return;
        }
        groupedData[key] = (groupedData[key] || 0) + 1;
      });
      const categories = Object.keys(groupedData).map((key) => key.toString());
      const data = Object.values(groupedData);

      const updatedOptions = {
        ...get().lineChartValues.options,
        xaxis: {
          ...get().lineChartValues.options.xaxis,
          categories: categories,
          type: 'category',
        },
      };

      const updatedSeries = {
        series: [
          {
            name: `Current Users`,
            data: data,
          },
        ],
      };

      set({
        lineChartValues: {
          options: updatedOptions,
          series: updatedSeries.series,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useDashboardStore;
