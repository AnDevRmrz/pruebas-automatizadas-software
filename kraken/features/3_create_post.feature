Feature: Crear post

@user2 @web
Scenario: Create post
  Given I navigate to page "http://localhost:3002/ghost"
  And I wait for 2 seconds
  When I type "alguien@hotmail.com" into the email field
  And I type "123456#213asdf" into the password field
  And I click on the sign-in button
  And I wait for 2 seconds
  Then I should see the title
  And I wait for 2 seconds
  When I click on the posts link
  And I wait for 4 seconds
  And I click on the new post button
  And I wait for 4 seconds
  And I type "Post Title" into the post title field
  And I type "Some text for the post content" into the content field
  Then the publish button should be visible
  And I click on publish
  And I click on continue
  And I click on publish
  And I wait for 2 seconds
