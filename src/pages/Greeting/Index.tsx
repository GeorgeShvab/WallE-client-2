import useTitle from '@/hooks/useTitle'
import { FC } from 'react'
import { Link } from 'react-router-dom'

// It should have been a page, but I decided not to include it.
const Greeting: FC = () => {
  useTitle('Вітаємо на WallE')

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="px-8 py-12 lg:px-16 sm:rounded shadow bg-white relative h-[580px] w-[450px] flex justify-center">
        <div>
          <div className="flex justify-center mb-6">
            <svg
              aria-hidden="true"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3.84003" y="2.88" width="40.32" height="40.32" rx="8" fill="white" />
              <path
                d="M14.0469 29.7969L18.2031 33.9531L16.7812 35.375H15.25V32.75H12.625V31.2188L14.0469 29.7969ZM25.3672 19.1328C25.6224 19.3698 25.5951 19.6432 25.2852 19.9531L17.3281 27.9102C17.0182 28.2201 16.7448 28.2474 16.5078 27.9922C16.2526 27.7552 16.2799 27.4818 16.5898 27.1719L24.5469 19.2148C24.8568 18.9049 25.1302 18.8776 25.3672 19.1328ZM17.875 38L32.75 23.125L24.875 15.25L10 30.125V38H17.875ZM34.5 21.375L37.0156 18.8594C37.526 18.349 37.7812 17.7292 37.7812 17C37.7812 16.2708 37.526 15.651 37.0156 15.1406L32.8594 10.9844C32.349 10.474 31.7292 10.2188 31 10.2188C30.2708 10.2188 29.651 10.474 29.1406 10.9844L26.625 13.5L34.5 21.375ZM45 10.875V37.125C45 39.2943 44.2298 41.1491 42.6895 42.6895C41.1491 44.2298 39.2943 45 37.125 45H10.875C8.70573 45 6.85091 44.2298 5.31055 42.6895C3.77018 41.1491 3 39.2943 3 37.125V10.875C3 8.70573 3.77018 6.85091 5.31055 5.31055C6.85091 3.77018 8.70573 3 10.875 3H37.125C39.2943 3 41.1491 3.77018 42.6895 5.31055C44.2298 6.85091 45 8.70573 45 10.875Z"
                fill="#121212"
              />
            </svg>
          </div>
          <h1 className="text-2xl text-center font-bold mb-6">Раді вас бачити</h1>
          <p className="text-center text-neutral-400 text-sm mb-12">
            Щоб почати роботу, увійдіть або створіть новий аккаунт
          </p>
          <div className="flex flex-col items-center gap-2.5 mb-6">
            <Link
              to="/signin"
              className="rounded px-6 flex justify-center items-center text-sm bg-white border-2 border-black-main text-black-main w-72 h-10 hover:bg-neutral-50 transition-colors"
            >
              Увійти
            </Link>
            <Link
              to="/signup"
              className="rounded px-6 flex justify-center items-center text-sm bg-black-main text-white w-72 h-10 hover:bg-black-light transition-colors"
            >
              Створити аккаунт
            </Link>
            <hr className="my-4 bg-neutral-200 h-px w-80" />
            <button className="rounded px-6 flex gap-4 justify-center items-center text-sm bg-white border-2 border-black-main hover:bg-neutral-50 text-black-main w-72 h-10">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_46_2)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.31016 9.99995C4.31016 9.35042 4.41797 8.7276 4.61063 8.14354L1.24031 5.56995C0.58344 6.90354 0.21344 8.40635 0.21344 9.99995C0.21344 11.5923 0.583127 13.094 1.23891 14.4268L4.60735 11.8482C4.41656 11.2668 4.31016 10.6464 4.31016 9.99995Z"
                    fill="#FBBC05"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.2277 4.09094C11.6388 4.09094 12.9133 4.59094 13.9147 5.40906L16.8278 2.5C15.0527 0.954531 12.7767 0 10.2277 0C6.27017 0 2.86892 2.26312 1.24033 5.57L4.61048 8.14359C5.38704 5.78641 7.60064 4.09094 10.2277 4.09094Z"
                    fill="#EA4335"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.2277 15.9091C7.60079 15.9091 5.3872 14.2136 4.61064 11.8564L1.24033 14.4296C2.86892 17.7369 6.27017 20 10.2277 20C12.6702 20 15.0022 19.1327 16.7524 17.5077L13.5533 15.0346C12.6506 15.6032 11.5139 15.9091 10.2277 15.9091Z"
                    fill="#34A853"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.7866 10C19.7866 9.40907 19.6955 8.77267 19.5589 8.18188H10.2277V12.0455H15.5989C15.3303 13.3628 14.5994 14.3755 13.5533 15.0345L16.7523 17.5077C18.5908 15.8014 19.7866 13.2595 19.7866 10Z"
                    fill="#4285F4"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_46_2">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>Продовжити з Google</span>
            </button>
            <button className="rounded px-6 flex gap-4 justify-center items-center text-sm bg-white border-2 border-black-main hover:bg-neutral-50 text-black-main w-72 h-10">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_47_10)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0005 0C4.47792 0 0 4.58953 0 10.255C0 14.7865 2.86622 18.626 6.83965 19.9832C7.33967 20.077 7.52272 19.76 7.52272 19.4876C7.52272 19.2421 7.51379 18.5992 7.50933 17.742C4.72793 18.3626 4.13861 16.3669 4.13861 16.3669C3.68323 15.1838 3.02695 14.8669 3.02695 14.8669C2.12065 14.2284 3.09391 14.2418 3.09391 14.2418C4.09843 14.3133 4.62524 15.2999 4.62524 15.2999C5.51815 16.867 6.96465 16.416 7.53611 16.1526C7.6254 15.4919 7.88435 15.0365 8.17007 14.782C5.95121 14.5231 3.61626 13.6436 3.61626 9.7148C3.61626 8.5942 4.00468 7.67898 4.6431 6.96465C4.54042 6.70571 4.19665 5.66101 4.74132 4.25022C4.74132 4.25022 5.58065 3.97342 7.49147 5.29939C8.29062 5.0717 9.14334 4.96008 9.99606 4.95562C10.8443 4.96008 11.7015 5.0717 12.5007 5.29939C14.4115 3.97342 15.2463 4.25022 15.2463 4.25022C15.791 5.66101 15.4472 6.70571 15.3446 6.96465C15.983 7.68344 16.3714 8.59867 16.3714 9.7148C16.3714 13.6525 14.032 14.5186 11.8042 14.7731C12.1614 15.0901 12.4828 15.7151 12.4828 16.6705C12.4828 18.0411 12.4694 19.1483 12.4694 19.4832C12.4694 19.7555 12.648 20.077 13.1569 19.9743C17.1393 18.6215 20.0011 14.782 20.0011 10.255C20.0011 4.58953 15.5231 0 10.0005 0Z"
                    fill="#080808"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_47_10">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>Продовжити з Github</span>
            </button>
          </div>
          <p className="text-center text-sky-400 text-sm hover:text-sky-600 transition-colors">
            <a href="/">Повернутись на головну</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Greeting
