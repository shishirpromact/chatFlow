// import React from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import RegisterForm from "@/components/auth/RegisterForm";
// import LoginForm from "@/components/auth/LoginForm";

// function AuthScreen() {
//   return (
//     <div className="h-[100vh] w-[100vw] flex items-center justify-center">
//       <div className="h-[80vh] w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] bg-white border-2 border-white text-opacity-90 shadow-2xl rounded-2xl">
//         <div className="flex flex-col items-center justify-center">
//           <h1 className="text-3xl font-bold">Welcome to Chat Flow</h1>
//           <p className="text-lg">Join the conversation and have fun</p>
//         </div>
//         <div className="flex flex-col items-center">
//           <Tabs
//             defaultValue="register"
//             className="flex flex-col items-center justify-center h-full w-full"
//           >
//             <TabsList>
//               <TabsTrigger value="register">Register</TabsTrigger>
//               <TabsTrigger value="login">Login</TabsTrigger>
//             </TabsList>
//             <TabsContent value="register">
//               <RegisterForm />
//             </TabsContent>
//             <TabsContent value="login">
//               <LoginForm />
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuthScreen;

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginForm from "@/components/auth/LoginForm";

function AuthScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 p-4">
      <div className="w-full max-w-xl bg-white border border-gray-200 shadow-xl rounded-2xl p-6 md:p-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome to Chat Flow
          </h1>
          <p className="text-slate-600 text-base">
            Join the conversation and have fun
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthScreen;
