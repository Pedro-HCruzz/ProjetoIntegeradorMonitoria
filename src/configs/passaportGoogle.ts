import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import {prisma} from "../repositories/Prisma/client.js";


dotenv.config();

passport.use(new GoogleStrategy({
    clientID : process.env. GOOGLE_CLIENT_ID as string,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL : process.env.GOOGLE_CALLBACK_URL as string
    },
    async(accessToken, refreshToken, profile, done) => { // essas funções são do google, não nossas
        try {
            const emailUsuario = profile.emails?.[0].value;

            if (!emailUsuario){
                return done(new Error("Sem email fornecido do google"), undefined);
            }

            let user = await prisma.aluno.findUnique({ //vendo se o usuário existe no banco
                where : {email : emailUsuario}
            })

            if(!user){
                /*let user = await prisma.aluno.create({
                    data : {
                        //parei aqui, MATRICULA SERÁ OPCIONAL?
                    
                })*/
            }
            return done(null, profile)
        } catch (error) {
            return done(error,undefined);
        }
    }
));

export default passport;