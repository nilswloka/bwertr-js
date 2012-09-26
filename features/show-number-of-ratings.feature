Feature: Show number of ratings

  As a platform owner
  I want my users to see the number of times a presentation has been rated before
  So that they feel compelled to rate

  Scenario: No ratings
    Given there are 0 ratings
    When I visit the application
    Then I can see that there are 0 ratings.

  Scenario: Some ratings
    Given there are 0 ratings
    When I visit the application
    Then I can see that there are 5 ratings.