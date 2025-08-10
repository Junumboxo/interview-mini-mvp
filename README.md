# interview-mini-mvp
Just what I thought the product could roughly look like. Instead of showing off in a technology I know I am good at, I have decided that it is probably better if I build a working three-tier app prototype in a completely new stack (which also is chatlyn's stack, at least based on the job description). It is a small chat-like app that fetches (mocked) messages from different users on different platforms and conveniently summarizes them, also providing on-demand translation functionality. It uses mongoDB to store messages and their senders, as well as auth entities for the app. Currently you can not use the registration button on the login page, so I have added a test endpoint to the backend (all other endpoints are behind a JWT Guard). The FE also make uses of best practices such as caching and middleware guards.

A few things that could be improved:
- Tests, of course :D
- Rate-limiting for the /auth/login endpoint
- Improving the mock message generator by loading existing users as well and making sure that one user only sends messages in one message
