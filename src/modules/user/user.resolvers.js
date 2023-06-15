export default {
  Query: {
        getAllUsers: async (parent, args, ctx) => {
          try {
            const {
              models: { User },
              req: { user },
            } = ctx            
            const users = await User.findAll({})
            return users
          } catch (error) {
            return new Error(error)
          }
        },
  },
  Mutation: {
    createUser: async (parent, args, ctx) => {
      try {
        const { input } = args;
        const { models: {User}} = ctx
        console.log("args>>>>>>>>>.", input);

        const isExistEmail = await User.findOne({where: {email: input?.email}}) 
        console.log({isExistEmail});
        if(isExistEmail){
          throw new Error("This email already exist!")
        }

        const data = await User.create(input);
        console.log("data>>>>>>>>", data);
        return data;

        // const result = await resolve(input);
        // return result;
      } catch (error) {
        console.log(error);
        throw new Error(error)
      }
    },
  },
};
