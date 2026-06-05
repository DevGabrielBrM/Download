import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="mb-6">Sorry, we couldn't find the page you're looking for.</p>
      <Link href="/" className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors">
        Go Back Home
      </Link>
    </div>
  );
}
