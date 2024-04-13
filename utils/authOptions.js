import GoogleProvider from "next-auth/providers/google";
import connectDb from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      //1.connect to database
      await connectDb();
      //2. check if the user exists
      const userExists = await User.findOne({email:profile.email})
      //3. if not , then add user to the database
      if(!userExists){
           //truncate user name if to long
           const username = profile.name.slice(0,20);

           await User.create({

             email:profile.email,
             username,
             image:profile.picture,
           })
         
      }
      //4. return true to allow sign in
      return true;
    },

    //modifies the session object

    async session({ session }) {
      //1.get user from the  database
      const user = await User.findOne({email : session.user.email})
      //2. assign the user id to the session
      session.user.id = user._id.toString();
      //3. return  session

      return session;
    },
  },
};
