import { createContext, useEffect, useState } from 'react'

export const NotificationContext = createContext({
  notify: () => {}
})

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  const notify = ({ title, message, tone = 'success' }) => {
    setNotification({ title, message, tone })
  }

  useEffect(() => {
    if (!notification) return

    const timer = setTimeout(() => {
      setNotification(null)
    }, 2600)

    return () => clearTimeout(timer)
  }, [notification])

  const toneClass =
    notification?.tone === 'danger'
      ? 'border-red-200 bg-red-50 text-red-800'
      : notification?.tone === 'info'
        ? 'border-indigo-200 bg-indigo-50 text-indigo-800'
        : 'border-emerald-200 bg-emerald-50 text-emerald-800'

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification ? (
        <div className='fixed inset-x-4 top-5 z-50 flex justify-center'>
          <div
            role='status'
            className={`w-full max-w-sm rounded-lg border p-4 shadow-lg ${toneClass}`}
          >
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-sm font-black'>{notification.title}</p>
                <p className='mt-1 text-sm'>{notification.message}</p>
              </div>
              <button
                type='button'
                onClick={() => setNotification(null)}
                className='rounded-md px-2 text-lg leading-none hover:bg-white/60'
                aria-label='Close notification'
              >
                x
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </NotificationContext.Provider>
  )
}
