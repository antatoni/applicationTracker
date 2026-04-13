// import { createContext, useState, useEffect } from "react";

// export const SessionContext = createContext();

// export const SessionProvider = ({ children }) => {
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       setSession(session);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <SessionContext.Provider value={{ session, setSession }}>
//       {children}
//     </SessionContext.Provider>
//   );
// };
