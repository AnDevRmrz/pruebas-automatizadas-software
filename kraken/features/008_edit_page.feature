Feature: Page

@user3 @web
Scenario: Edit Page
    Given I navigate to page "http://localhost:3002/ghost"
    And I wait for 2 seconds
    When I type email login "alguien@hotmail.com"  
    And I type password "123456#213asdf"
    And I click in sign in
    And I wait for 1 seconds
    And I click on Pages
    And I wait for 1 seconds
    And I click on Go to Editor
    And I wait for 1 seconds
    And I change the title "Title changed"
    And I wait for 1 seconds
    And I change the description "Description changed"
    And I wait for 1 seconds
    And I click on Update
    And I wait for 1 seconds
    And I click on Go back
    And I wait for 1 seconds
    Then I check the Title changed
    And I wait for 1 seconds
