/*
    Inheritance
    Its like a super class that is extended to smaller pieces that adds or overrides the functionality

    Cons:
    =====
    Struture is what things are
    as we are predicting the future
    so there is tight coupling, its the opposite of reusable modular code
    Fragile base class problem, because base class changes all child classes
    hierarchy problem, what if it changes?

    User
        Watcher
        Character
            Elf
                Junior Elf (What if Junior Elf dont do anything? You will get all the unnecessary method)
            Ogre

*/

/*
    Composition
    Smaller pieces that are combined to make sth bigger

    Structure is what it does to data

    Pros:
    =====

    function getAttack(character){
        return Object.assign({}, character, { attack:()=>{} })
    }

    function Elf(name, weapon, type){
        let elf = {
            name,
            weapon,
            type
        }

        return getAttack(elf) // this will add the attack function to the Elf

        we cann add methods to it now!

    }
    
    Cons:
    =====
    Hard to understand than Inheritance
    
*/
