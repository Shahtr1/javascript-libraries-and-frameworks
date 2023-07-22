// will be in ts 5.2

const getResource=()=>{
  return {
      db:{
          getOneUser:()=>{
              return {
                  id:1
              }
          }
      },
      // asyncDispose is automatic dispose function
      [Symbol.asyncDispose]: async()=>{
          // close the database
      }
  }
}

const main = async()=>{
  await using resource = await getResource();
  // async dispose will be called when the resource leaves scope, when main function completes, resource will be disposed by asyncDispose

  try{
      const user = resource.db.getOneUser()
  }catch(e){
      console.error(e);
  }
}

export {}