Feature: Tags

@user1 @web
Scenario: 16 - Create Tag
  Given I navigate to page "http://localhost:3002/ghost"
  And I wait for 1 seconds
  When I type email login "alguien@hotmail.com"  
  And I type password "123456#213asdf"
  And I click in sign in
  And I wait for 1 seconds
  And I click on tag main option
  And I wait for 1 seconds
  And I click on new tag button
  And I wait for 1 seconds
  And I type in the tag name field "Tag Name Test"
  And I type in the slug field "slug-test"
  And I type in the description field "Description Test"
  And I click on the save tag button
  And I wait for 1 seconds
  Then I go to tags
  And I wait for 1 seconds
  And I can see a row with tag title name "Tag Name Test"
  And I can see a row with tag description "Description Test"
  And I can see a row with slug "slug-test"
  And I wait for 2 seconds