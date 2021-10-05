var {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLNonNull
} = require('graphql')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require('../database/models');

var UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This is represting a User object',
    fields: () => {
        return {


            id: {
                type: GraphQLInt,
                resolve(obj) {
                    return obj.intUserID
                }
            },

            name: {
                type: GraphQLString,
                resolve(obj) {
                    return obj.strName;
                }
            },
            email: {
                type: GraphQLString,
                resolve(obj) {
                    return obj.strEmail;
                }
            },

            date: {
                type: GraphQLString,
                resolve(obj) {
                    return obj.dtmDOB;
                }
            },
            isActive: {

                type: GraphQLBoolean,
                resolve(obj) {
                    return obj.blnIsActive;
                }



            }



        }
    }

})

var Query = new GraphQLObjectType({
    name: 'query',
    description: 'This is represting a User object',
    fields: () => {
        return {


            getAllUser: {
                type: new GraphQLList(UserType),
                args: {

                    intUserID: {
                        type: GraphQLInt,

                    },
                    strName: {
                        type: GraphQLString,

                    },
                    strEmail: {
                        type: GraphQLString,

                    },


                    blnIsActive: {

                        type: GraphQLBoolean,

                    }


                },
                resolve(root, args) {

                    return db.User.findAll({ where: args })
                }
            },
            getUserByID: {
                type: new GraphQLList(UserType),
                args: {

                    intUserID: {
                        type: GraphQLInt,

                    },
                },
                resolve(root, args) {

                    return db.User.findAll({ where: { intUserID: args.intUserID } })
                }

            },
            getUserByEmail: {
                type: new GraphQLList(UserType),
                args: {

                    strEmail: {
                        type: GraphQLString,

                    },
                },
                resolve(root, args) {

                    return db.User.findAll({
                        where: {
                            strEmail:
                            {
                                [Op.like]: `%${args.strEmail}%`
                            }

                        }
                    })
                }

            },
            loginUser: {
                type: new GraphQLList(UserType),
                args: {

                    strEmail: {
                        type: GraphQLString,

                    },
                    strPassword: {
                        type: GraphQLString,

                    },
                },
                resolve(root, args) {

                    return db.User.findAll({ where: { strEmail: args.strEmail, strPassword: args.strPassword } })
                }

            },




        }
    }
});

const Mutations = new GraphQLObjectType({
    name: "Mutation",
    description: " this mutation for creating new user",
    fields: () => {
        return {
            addUser: {
                type: UserType,
                args: {


                    name: {
                        type: new GraphQLNonNull(GraphQLString),

                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString),

                    },

                    dtmDOB: {

                        type: GraphQLString,

                    },

                    password:
                    {
                        type: new GraphQLNonNull(GraphQLString),
                    },

                    isActive: {

                        type: GraphQLBoolean,

                    }
                },

                resolve(_, args) {
                    return db.User.create({
                        strName: args.name,
                        strEmail: args.email.toLowerCase(),
                        strPassword: args.password,
                        dtmDOB: args.date,
                        blnIsActive: args.isActive
                    });
                }
            },

            updateUser: {
                type: UserType,
                args: {

                    ID: {
                        type: new GraphQLNonNull(GraphQLInt),

                    },
                    name: {
                        type: GraphQLString,

                    },
                    email: {
                        type: GraphQLString,

                    },

                    dtmDOB: {

                        type: GraphQLString,

                    },

                    password:
                    {
                        type: GraphQLString,
                    },

                    isActive: {

                        type: GraphQLBoolean,

                    }
                },

                async resolve(_, args) {
                    return await db.User.update({
                        strName: args.name,
                        strEmail: args.email.toLowerCase(),
                        strPassword: args.password,
                        dtmDOB: args.date,
                        blnIsActive: args.isActive
                    },
                        {
                            where: { intUserID: args.ID },
                            returning: true,
                            plain: true
                        })





                }
            },

            deleteUser: {
                type: UserType,
                args: {

                    ID: {
                        type: new GraphQLNonNull(GraphQLInt),

                    },
                
                },

                async resolve(_, args) {
                    console.log(args.ID)
                    user = await db.User.findAll({ where: { intUserID: args.ID } })
                    await db.User.destroy({where: {
                        intUserID: args.ID 
                     }
                  }).then(function(rowDeleted){ 
                    if(rowDeleted === 1){
                        
                        return user
                     }
                  }, function(err){
                      return err; 
                  });

        

                }
            },

            
            updateUserStatus: {
                type: UserType,
                args: {

                    ID: {
                        type: new GraphQLNonNull(GraphQLInt),

                    },

                    isActive: {
                        type: new GraphQLNonNull(GraphQLBoolean),

                    }
                
                },

                async resolve(_, args) {
                    console.log(args.ID)
                    return await db.User.update({
                        blnIsActive: args.isActive
                    },
                        {
                            where: { intUserID: args.ID },
                            returning: true,
                            plain: true
                        })

        

                }
            }


        }
    }


})


const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutations

})

module.exports = schema;