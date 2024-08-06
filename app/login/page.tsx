import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className='bg-gray-400 border rounded-xl flex flex-col md:w-1/2 w-11/12 justify-items-center mb-20 mt-20 mx-auto'>
      <form className='flex flex-col text-center mb-20 mt-20 ' >
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" className='mx-20 rounded-sm' required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" className='mx-20 rounded-sm' required />
        <button formAction={login} className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 my-2 mx-60 rounded'>Log in</button>
        <button formAction={signup} className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 my-2 mx-60  rounded'>Sign up</button>
      </form>
    </div>
  )
}