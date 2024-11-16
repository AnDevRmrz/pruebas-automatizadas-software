Feature: Page

@user3 @web
Scenario: 06 - Create Page
    Given I navigate to page "http://localhost:3002/ghost"
    And I wait for 2 seconds
    When I type email login "alguien@hotmail.com"  
    And I type password "123456#213asdf"
    And I click in sign in
    And I wait for 1 seconds
    And I click on Pages
    And I wait for 1 seconds
    And I click on New page
    And I wait for 1 seconds
    And I type page title "Title"
    And I wait for 1 seconds
    And I type page description "Description"  
    And I wait for 1 seconds
    And I click in publish page menu
    And I wait for 1 seconds
    And I click in publish page button
    And I wait for 2 seconds
    And I click on Pages
    And I wait for 2 seconds
    Then there is a page with title "Title"
    And I wait for 1 seconds