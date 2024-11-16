Feature: Post

@user2 @web
Scenario: 05 - Delete post
  Given I navigate to page "http://localhost:3002/ghost"
  And I wait for 2 seconds
  When I type email login "alguien@hotmail.com" 
  And I type password login "123456#213asdf"
  And I click in sign in
  And I wait for 2 seconds
  And I click in posts
  And I wait for 2 seconds
  And I click in new post
  And I type post title "Auto post 1"
  And I type post description "this is a new post"
  And I wait for 2 seconds
  And I click in publish post menu
  And I wait for 1 seconds
  And I click in publish post button
  And I wait for 2 seconds
  And I click in post settings gear button
  And I wait for 1 seconds
  And I click in delete post button
  And I wait for 1 seconds
  And I click in delete post confirmation button
  And I wait for 1 seconds
  Then there is not a post with title "Auto post 1"
  And I wait for 2 seconds