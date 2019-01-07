/*-------------Start users section---------------*/
exports.qry_InsertUser = "INSERT INTO public.users(name, email, password, \"accessToken\",  \"isAdmin\")    VALUES ('_name', '_email', '_password', '_accesstoken', false)";
exports.qry_GetUserByEmail = "SELECT id, name, email, password, \"facebookId\", \"accessToken\" FROM public.users where email = '_email'";
exports.qry_InsertUserLocation = "UPDATE public.users set latitude = '_latitude', longitude = '_longitude' where id = '_userid'";
exports.qry_InsertUserMood = "UPDATE public.users set usermood = '_Mood' where id = '_userid'";
exports.qry_GetAuthenticateUser= "SELECT id, name, email, \"accessToken\" FROM public.users where email = '_email' and password = '_password'";
exports.qry_InsertUser_FB = "INSERT INTO public.users (name,\"facebookId\",email,\"accessToken\") values('_name', '_facebookId', '_email', '_accesstoken')";
exports.qry_GetUserByfacebookId = "Select id, email, \"accessToken\", name from public.users where \"facebookId\" = '_facebookId'";
exports.qry_updateUserByfacebookId = "UPDATE public.users SET  \"facebookId\" = '_fId'    WHERE email ='_email'";
/*-------------End users section---------------*/