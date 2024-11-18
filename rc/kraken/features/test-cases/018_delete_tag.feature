Feature: Tags

@user1 @web
Scenario: 18 - Delete Tag
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
  And I type in the tag name field "Tag Name Test 2"
  And I type in the slug field "slug-test-1"
  And I type in the description field "Description Test 1"
  And I click on the save tag button
  And I wait for 1 seconds
  And I click on tag main option
  And I click on the row with "slug-test-1" tag slug
  And I wait for 1 seconds
  And I click on the delete tag button
  And I wait for 1 seconds
  And I confirm the deletion of the tag
  Then I go to tags
  And I wait for 1 seconds
  And I cannot see a row with tag title name "Tag Name Test 2"
  And I cannot see a row with tag description "Description Test 1"
  And I cannot see a row with slug "slug-test-1"
  And I wait for 1 seconds