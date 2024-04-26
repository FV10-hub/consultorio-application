import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';


export default async function ShopLayout( { children }: {
  children: React.ReactNode;
} ) {


  const session = await auth();


  if ( session?.user ) {
    redirect('/personas');
  }

  return (

    <main className="flex justify-center bg-no-repeat bg-cover bg-[url('/login_fondo.jpg')] " >
      <div className="w-full sm:w-[350px] px-10">

        { children }

      </div>
    </main>
  );
}