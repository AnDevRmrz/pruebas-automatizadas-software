Feature: Page

@user3 @web
Scenario: Filter Page
    Given I navigate to page "http://localhost:3002/ghost"
    And I wait for 2 seconds
    When I type email login "alguien@hotmail.com"  
    And I type password "123456#213asdf"
    And I click in sign in
    And I wait for 2 seconds
    Then The title is visible
    And I wait for 1 seconds
    When I click on Pages
    And I wait for 1 seconds
    And I click on New page
    And I wait for 1 seconds
    And I type page title "Title draft"
    And I wait for 1 seconds
    And I type page description "Description draft"  
    And I wait for 1 seconds
    And I click on Go back
    And I wait for 1 seconds
    And I click on filter all Pages
    And I wait for 1 seconds
    And I click on draft Pages
    And I wait for 1 seconds
    Then I check the title drafted
    And I wait for 1 seconds
    And I check the attribute draft 