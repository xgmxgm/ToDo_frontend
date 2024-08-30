import { rtkApi } from '@/shared/libs/api/init'

export const taskApi = rtkApi.injectEndpoints({
	endpoints: build => ({
		getTasks: build.query({
			query: params => ({
				url: `/task/get-tasks/${params.authorId}`,
			}),
			providesTags: ['Task'],
		}),
		addTask: build.mutation({
			query: params => ({
				url: '/task/create',
				method: 'POST',
				body: params.body,
			}),
			invalidatesTags: ['Task'],
		}),
		deleteTask: build.mutation({
			query: params => ({
				url: '/task/delete',
				method: 'POST',
				body: params.body,
			}),
			invalidatesTags: ['Task'],
		}),
		completeTask: build.mutation({
			query: params => ({
				url: '/task/complete',
				method: 'POST',
				body: params.body,
			}),
			invalidatesTags: ['Task'],
		}),
		addSubTask: build.mutation({
			query: params => ({
				url: '/task/create-sub-task',
				method: 'POST',
				body: params.body,
			}),
			invalidatesTags: ['Task'],
		}),
		deleteSubTask: build.mutation({
			query: params => ({
				url: '/task/delete-sub-task',
				method: 'POST',
				body: params.body,
			}),
			invalidatesTags: ['Task'],
		}),
		completeSubTask: build.mutation({
			query: params => ({
				url: '/task/complete-sub-task',
				method: 'POST',
				body: params.body,
			}),
			invalidatesTags: ['Task'],
		}),
		editTask: build.mutation({
			query: params => ({
				url: '/task/edit/task',
				method: 'POST',
				body: params.body,
			}),
			invalidatesTags: ['Task'],
		}),
		editSubTask: build.mutation({
			query: params => ({
				url: '/task/edit/subtask',
				method: 'POST',
				body: params.body,
			}),
			invalidatesTags: ['Task'],
		}),
	}),
})

export const {
	useCompleteSubTaskMutation,
	useDeleteSubTaskMutation,
	useCompleteTaskMutation,
	useEditSubTaskMutation,
	useDeleteTaskMutation,
	useAddSubTaskMutation,
	useEditTaskMutation,
	useAddTaskMutation,
	useGetTasksQuery,
} = taskApi
