import Navbar from "@/components/component/Navbar";

export default function Community() {
  return (
    <div className="px-[110px]">
      <Navbar />

      <div className="grid grid-cols-3 gap-3">
        <div className="pr-3">
          <div className="border border-gray-200 rounded-md shadow p-3 flex items-center">
            <p>Find Nearby : </p>
            <button className="border-2 border-gray-200 hover:bg-gray-100 p-2 px-4 rounded-sm ml-2">
              Find
            </button>
          </div>
        </div>

        <div className="col-span-2 grid grid-cols-3 gap-3">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pt-6 pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Bonnie Green
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Visual Designer
              </span>
              <div className="flex mt-4 md:mt-6">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add friend
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
                >
                  Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
