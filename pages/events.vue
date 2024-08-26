<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Records</h2>
    </div>
    <div class="mx-auto mt-16 max-w-xl sm:mt-20">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Balance</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation Response</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="record in records" :key="record.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.operation_id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.user_id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.amount }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.user_balance }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.operation_response }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.date }}</td>
          </tr>
        </tbody>
      </table>

      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between mt-6">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">1</span>
            to
            <span class="font-medium">3</span>
            of
            <span class="font-medium">{{ records.length }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a href="#" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" aria-current="page" class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
            <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
            <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
            <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
            <a href="#" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Record {
  id: number;
  operation_id: number;
  user_id: number;
  amount: number;
  user_balance: number;
  operation_response: string;
  date: string;
}

export default defineComponent({
  name: 'RecordTable',
  setup() {
    const records = ref<Record[]>([
      {
        id: 1,
        operation_id: 101,
        user_id: 1,
        amount: 100.5,
        user_balance: 900.5,
        operation_response: 'Success',
        date: '2024-08-26',
      },
      {
        id: 2,
        operation_id: 102,
        user_id: 2,
        amount: 200.75,
        user_balance: 799.25,
        operation_response: 'Failed',
        date: '2024-08-25',
      },
      {
        id: 3,
        operation_id: 103,
        user_id: 3,
        amount: 50.0,
        user_balance: 450.0,
        operation_response: 'Success',
        date: '2024-08-24',
      },
    ]);

    return {
      records,
    };
  },
});
</script>
