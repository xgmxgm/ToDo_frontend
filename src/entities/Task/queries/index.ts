import { rtkApi } from '@/shared/libs/api/init'

export const taskApi = rtkApi.injectEndpoints({
	endpoints: build => ({
		getTasks: build.query({
			query: (authorId: number = 0) => `/task/get-tasks/${authorId}`,
			providesTags: ['Task'],
		}),
		addTask: build.mutation({
			query: body => ({
				url: '/task/create',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Task'],
		}),
		deleteTask: build.mutation({
			query: body => ({
				url: '/task/delete',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Task'],
		}),
		completeTask: build.mutation({
			query: body => ({
				url: '/task/complete',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Task'],
		}),
		addSubTask: build.mutation({
			query: body => ({
				url: '/task/create-sub-task',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Task'],
		}),
		deleteSubTask: build.mutation({
			query: body => ({
				url: '/task/delete-sub-task',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Task'],
		}),
		completeSubTask: build.mutation({
			query: body => ({
				url: '/task/complete-sub-task',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Task'],
		}),
	}),
})

export const {
	useGetTasksQuery,
	useAddTaskMutation,
	useDeleteTaskMutation,
	useCompleteTaskMutation,
	useAddSubTaskMutation,
	useDeleteSubTaskMutation,
	useCompleteSubTaskMutation,
} = taskApi
