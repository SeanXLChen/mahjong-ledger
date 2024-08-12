import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="bg-base-200 shadow-xl rounded-xl p-8 md:w-1/3 w-full mx-4">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
        <form className="flex flex-col space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-semibold text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
              required
            />
          </div>
          <button
            formAction={login}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Log in
          </button>
          <button
            formAction={signup}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Sign up
          </button>
        </form>

        {/* // something good for later upgrade */}
        {/* <p className="text-center mt-6 text-gray-600">
          Don't have an account? <a href="/signup" className="text-emerald-600 hover:underline">Sign up here</a>
        </p> */}
      </div>
    </div>
  )
}
