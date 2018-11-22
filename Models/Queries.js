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



/*-------------start questions section---------------*/
exports.qry_GetQuestions = 'select array_to_json(array_agg(row_to_json(t))) result from (select id, question, "parentId" as parentid, "serialNo" as questionserialno, "questionType" as questiontype, (select array_to_json(array_agg(row_to_json(d))) from (select id, answers as answer, "optionCode" as optionvalue from public.answers where public.answers."questionId" = public.questions.id and "isActive" = true order by id asc) d ) as options from public.questions where "isActive" = true order by "serialNo" asc) t';
/*-------------end questions section---------------*/



/*-------------start notifications section---------------*/
exports.qry_InsertNotification = "INSERT INTO public.notifications(email) VALUES('_email')";
exports.qry_GetEmail_Notification = "SELECT id, email FROM public.notifications where email = '_email'";
/*-------------start notifications section---------------*/



/*-------------start user answers section---------------*/
exports.qry_InsertUserAnswers = "INSERT INTO public.useranswers(\"userId\", \"questionId\", \"answerId\") VALUES ( _userid, _questionid ,'_answerid');";
/*-------------end user answers section---------------*/



/*-------------start user chat history section---------------*/
exports.qry_InsertUserChatHistory = "INSERT INTO public.chathistories(\"userId\", \"questionText\", \"replyText\") VALUES(_userid,'_questiontext','_replytext');";
/*-------------end user chat history section---------------*/



/*-------------start phrases section---------------*/
exports.qry_GetRandomPhrase = "SELECT id, \"phrasesText\" FROM public.phrases where \"isActive\" = true order By Random() Limit 1";
/*-------------end phrases section---------------*/



/*-------------start get ranodom staying in option section---------------*/
exports.qry_GetRandomStayingInOption = "SELECT id, \"optionText\", icon, image FROM public.stayinginoptions where \"isActive\" = true and \"isDeleted\" = false ORDER BY RANDOM() LIMIT 1";
/*-------------end get ranodom staying in option section---------------*/