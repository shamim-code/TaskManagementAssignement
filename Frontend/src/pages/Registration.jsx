import React from "react";

export default function Registration() {
  return (
    <div class="bg-gray-50 font-[sans-serif]">
      <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div class="max-w-md w-full">
          <div class="p-8 rounded-2xl bg-white shadow">
            <h2 class="text-gray-800 text-center text-2xl font-bold">
              Registration
            </h2>
            <form class="mt-8 space-y-4">
              <div>
                <label class="text-gray-800 text-sm mb-2 block">
                  User name
                </label>
                <div class="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter user name"
                  />
                </div>
              </div>

              <div>
                <label class="text-gray-800 text-sm mb-2 block">Email</label>
                <div class="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter user name"
                  />
                </div>
              </div>

              <div>
                <label class="text-gray-800 text-sm mb-2 block">Password</label>
                <div class="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    for="remember-me"
                    class="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div class="!mt-8">
                <button
                  type="button"
                  class="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
              <p class="text-gray-800 text-sm !mt-8 text-center">
                Have an account?{" "}
                <a
                  href="/login"
                  class="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
