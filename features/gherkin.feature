@firstfeat
Feature: Login

    Feature Description


@login
Scenario Outline: I connect

    Given I am on login page
    When I enter '<email>' and '<password>'
    Then I press the button to connect

    Examples:
        | email                     | password   | 
        | gregtcheugue@gmail.com    | Barcelone  | 
  
       

@inscription
Scenario Outline: I'm registering

    Given I am on inscription page
    When I enter '<email>' and '<password>' and '<confirmation>'
    Then I press the button to register
    Examples:
        | email                     | password   | confirmation |
        | gregtcheuguen@gmail.com   | Barcelone  | Barcelone    |

@search
Scenario Outline: I search a product

    Given I am on homepage
    When I enter '<product>' in searchbar
    Then I valid 
    Examples:
        |product|
        |Ampoule|
       




@addproduct
Scenario Outline: I add a product

    Given I am on homepage
    When I click on button icon to add a '<product>' and put a '<quantity>'
    Then The product is added to cart
    Examples:
    |product |quantity| 
    |Ampoule |5       |

   
    
@removeproduct
Scenario Outline: I remove a product

    Given I connect with '<email>' and '<password>'
    When I click on button icon to delete a product
    Then The '<product>' is deleted
    Examples:
    |product|email                     | password   |
    |Ampoule|gregtcheuguen@gmail.com   | Barcelone  |

@logout
Scenario: I log out

    Given I am on homepage
    When I click on button logout
    Then I deconnect 