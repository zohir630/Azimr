// GitHub Pages-এ সাইট সাবফোল্ডারে (/repo-name) চলে, তাই ছবির পাথের আগে basePath বসাতে হয়।
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/${path.replace(/^\/+/, '')}`
