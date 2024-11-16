Feature: Tags

@user1 @web
Scenario: 18 - Delete Tag
  Given I navigate to page "http://localhost:3002/ghost"
  And I wait for 1 seconds
  When I type email login "alguien@hotmail.com"  
  And I type password login "123456#213asdf"
  And I click in sign in
  And I wait for 1 seconds
  And I click on tag main option
  And I wait for 1 seconds
  And I click on the row with "new-slug-test" tag slug
  And I wait for 1 seconds
  And I click on the delete tag button
  And I wait for 1 seconds
  And I confirm the deletion of the tag
  Then I go to tags
  And I wait for 1 seconds
  And I cannot see a row with tag title name "New Tag Name Test"
  And I cannot see a row with tag description "New Description Test"
  And I cannot see a row with slug "new-slug-test"
  And I wait for 1 seconds