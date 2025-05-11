// app/page.tsx

// "use client";
//
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";


import {Layout} from "@/app/layout/Layout";

export default function Home () {
  //const router = useRouter();

  // useEffect(() => {
  //   router.push("/login");
  // }, [router]);

 // return null; // Ничего не рендерим, так как сразу происходит редирект
    return (
        <Layout>
            <h3>Добро пожаловать! главная страница</h3>
            {/* Здесь можешь рендерить свой Layout или Dashboard */}
        </Layout>
    );
};


// app/page.tsx
// import { authHandler } from "@/lib/auth";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
//
// export default async function Home() {
//     const cookieStore = await cookies();
//     const allCookies = cookieStore.getAll();
//     const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join("; ");
//
//     // Получаем сессию через authHandler
//     const response = await authHandler(
//         new Request("http://localhost:3000/api/auth/session", {
//             method: "GET",
//             headers: {
//                 cookie: cookieHeader,
//             },
//         })
//     );
//
//     const session = await response.json();
//
//     if (!session?.user) {
//         redirect("/login");
//     }
//
//     return (
//         <main>
//             <h1>Добро пожаловать, {session.user.firstName}!</h1>
//         </main>
//     );
// }




