import { type FastifyPluginAsync } from 'fastify'
import fastifySwagger, { type FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import fastifySwaggerUi, { type FastifySwaggerUiOptions } from '@fastify/swagger-ui'


export const openApiOptions: FastifyDynamicSwaggerOptions = {
    openapi: {
        info: {
            title: 'Api Peredelano Afisha',
            description: 'REST API Peredelano Afisha',
            version: '0.0.1'
        },
        // components: {
        //     securitySchemes: {            
        //         Bearer: {
        //             type: 'http',
        //             scheme: 'bearer'
        //         }
        //     }
        // }
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    hideUntagged: true
}

export const openApiUiOptions: FastifySwaggerUiOptions = {
    routePrefix: 'api/docs',
    initOAuth: {},
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next()
        },
        preHandler: function (request, reply, next) {
            next()
        }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header
}


