Feature: Crear Post

@user3 @web
Scenario: Create Post
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
    And I do right click over the Title Changed
    And I wait for 1 seconds
    And I click on delete
    And I wait for 1 seconds
    And I click on big delete once again
    And I wait for 1 seconds
    Then I check that the deleted page is no longer existent
    And I wait for 1 seconds
