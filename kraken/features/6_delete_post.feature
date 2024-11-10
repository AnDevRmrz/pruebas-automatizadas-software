Feature: Post

@user2 @web
Scenario: Delete post
  Given I navigate to page "http://localhost:3002/ghost"
  And I wait for 2 seconds
  When I type email login "alguien@hotmail.com" 
  And I type password "123456#213asdf"
  And I click in sign in
  And I wait for 2 seconds
  And I click in posts
  And I wait for 2 seconds
  And I click in new post
  And I wait for 2 seconds
  And I type post title "Auto post"
  And I wait for 2 seconds
  And I type post description "this is a new post"
  And I wait for 2 seconds
  And I click in publish post
  And I wait for 2 seconds
  And I click in continue post
  And I wait for 2 seconds
  And I click in confirm publish post
  And I wait for 2 seconds
  And I click in post analytic
  And I wait for 2 seconds
  And I click in analytics button and delete post
  And I wait for 2 seconds