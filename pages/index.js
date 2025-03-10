import MasterLayout from '@/components/layouts/MasterLayout'

export default function Home() {
  return (
    <MasterLayout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold">Welcome to DevNews</h1>
        <p className="mt-4">Your source for the latest technology news</p>
      </div>
    </MasterLayout>
  );
}