## From Branding to Full-Stack Development

This project began as a design exercise for a local contractor, crafting a logo and basic branding elements. Recognizing the client's need for a strong online presence, I leveraged the project as an opportunity to expand my skillset into full-stack development.

## Bridging the Knowledge Gap

As a self-taught developer progressing through freeCodeCamp's curriculum, I actively addressed the gap between my learning and the client's specific requirements. This hands-on experience solidified my understanding of both front-end and back-end development principles.

Developing the backend with security as a top priority involved integrating Google reCAPTCHA for spam prevention and leveraging the client's SMTP services for automated emails. My approach ensured secure communication with third-party services. The highlight is a secure contact form that utilizes a custom AWS Lambda function for form submission processing. The final product is a React-based SPA featuring a static portfolio and contact information.

## Challenges and Takeaways

Because the front end and the back end for the site were hosted separately, I had to pull in knowledge from domains outside of purely client-side development.

The first issue was CORS. I spent a lot of time poking around AWS to figure out what was going on because I could see that the Lambda handling contact form POST requests wasn't even spinning up. My search eventually led me to use AWS's API Gateway to handle the CORS requests as well as validating the the JSON body of incoming requests. And that was after a few days of trying to figure out AWS's roles and policies regarding services invoking each other and determining what gets logged in CloudWatch.

And this leads to a larger discussion: in general, I can tell that AWS is powerful in the right hands or with the right team, but it was definitely difficult to grasp while also learning web development in general. I depend on my IDE to point me towards improving the quality of my code. I was unused to developing with the AWS SDKs, so I often found myself digging through the AWS console to fix configuration issues that I might have been able to address if they were flagged through Linting / TypeScript warnings in my IDE. And often times, I wasn't sure if problems arose due to my code or due to mis-configuring AWS. Going forward, I'd try to use the AWS SDKs locally instead of wrangling AWS in the context of its web console.
