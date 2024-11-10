Feature: Settings

@user1 @web
Scenario: 20 - Set title and description
  Given I navigate to page "http://localhost:3002/ghost"
  And I wait for 1 seconds
  When I type email login "alguien@hotmail.com"  
  And I type password "123456#213asdf"
  And I click in sign in
  And I wait for 1 seconds
  And I click on the settings button
  And I wait for 1 seconds
  And I click on the edit button of title & description
  And I wait for 1 seconds
  And I type site title "New Site Title"
  And I type site description "New Site Description"
  And I click on the save button of title & description
  And I wait for 1 seconds
  Then I can see the site title as "New Site Title"
  And I can see the site description as "New Site Description"
  And I wait for 1 seconds