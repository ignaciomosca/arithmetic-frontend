<template>
  <div class="isolate bg-black px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-indigo-500 sm:text-4xl">Records</h2>
    </div>
    <p class="mt-10 text-center text-sm text-gray-500">
      Keep performing
      <a href="/operations" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Operations</a>
    </p>
    <div class="mx-auto mt-16 max-w-xl sm:mt-20">
      <input
        v-model="searchTerm"
        @input="search"
        type="text"
        placeholder="Search by operation"
        class="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <div class="mx-auto mt-16 max-w-xl sm:mt-20">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Balance</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation Response</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="record in records" :key="record.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">{{ record.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">{{ record.operation_text }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">{{ record.user_id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">{{ record.amount }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">{{ record.user_balance }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">{{ record.operation_response }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">{{ record.date }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
              <button @click="deleteRecord(record.id)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between mt-6">
  <div>
    <p class="mt-10 text-center text-sm text-gray-500">
      Showing
      <span class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">{{ (offset + 1) }}</span>
      to
      <span class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">{{ Math.min(offset + limit, records.length) }}</span>
      of
      <span class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">{{ totalPages * limit }}</span>
      results
    </p>
  </div>
  <div>
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span class="sr-only">Previous</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
          </svg>
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="{
            'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white': currentPage === page,
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-indigo-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50': currentPage !== page,
          }"
        >
          {{ page }}
        </button>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span class="sr-only">Next</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  </div>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRuntimeConfig } from '#app';


interface Record {
  id: number;
  user_id: number;
  amount: number;
  user_balance: number;
  operation_text: string;
  operation_response: string;
  date: string;
}

interface Records {
  records: Record[];
  total_count: number;
}

export default defineComponent({
  name: 'RecordTable',
  data() {
    return {
      records: [] as Record[],
      searchTerm: '' as string,
      limit: 10,
      offset: 0,
      currentPage: 1,
      totalPages: 0,
    };
  },
  async mounted() {
    await this.fetchRecords();
  },
  methods: {
    async fetchRecords() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get<Records>(`http://localhost:8000/api/operation/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            limit: this.limit,
            offset: this.offset,
          },
        });
        this.records = response.data.records;
        this.totalPages = Math.ceil(response.data.total_count / this.limit);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteRecord(recordId: number) {
      try {
        await axios.delete(`${config.public.apiBaseUrl}/api/operation/${recordId}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.records = this.records.filter(record => record.id !== recordId);
      } catch (error) {
        console.error('Failed to delete record:', error);
      }
    },
    async search() {
      try {
        const response = await axios.get(`${config.public.apiBaseUrl}/api/operation/search/${this.searchTerm}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.records = response.data;
      } catch (error) {
        console.error('Failed to search records:', error);
      }
    },
    changePage(page: number) {
      this.currentPage = page;
      this.offset = (this.currentPage - 1) * this.limit;
      this.fetchRecords();
    },
  },
});
</script>
