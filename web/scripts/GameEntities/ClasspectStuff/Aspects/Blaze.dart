import '../../../SBURBSim.dart';
import 'Aspect.dart';
import "../../../Lands/FeatureTypes/QuestChainFeature.dart";
import "../../../Lands/Reward.dart";
import "../../../Lands/Quest.dart";

class Blaze extends Aspect { //blaze, aka light² //original aspect by [redacted]

    //what sort of quests rewards do I get?
    @override
    double itemWeight = 1.01;
    @override
    double fraymotifWeight = 0.5;
    @override
    double companionWeight = 0.01; //dont' share the spotlihgt

    @override
    List<String> associatedScenes = <String>[
        "[Introspection]:___ N4IgdghgtgpiBcIDaBJMAXATgewM4AcYBjdAS2zAF0QAaEAMwBsIA3bTAFRgA90EQAPACMAfKgw4CxMhUoCA9KIA6YYZhEqOACxgACAMoBhAKIA5YwH0A8gHVzAJQumAggFljugNZhsAd1y66FoQ6IE6uhzO9gDixhxObpZWji7u+rpE2ACujAAmulm4erjYsLqMWUSeuqRgYTCkmOWk9DA0uhBg+SX1AJ6BMBBEWvURUbHxqUkpiemduoO4-b4Q-ejYNWBEmIt6QXrYubkB2PSjWWCMpJ4wjP3B+IRgtQDmm-WNuvSs7AB0KmoRIDaCB0BBMC8YOgrGA4IgsFk4HQsKQXpDMIYKLlSDIwLgADKkFivfhIYBKECkKD4dhgjA2di5CnwCn6To43oUmgU0xWDjMinfRhFLkUgBq9hQ+gA0s4BQwIMKYKLwNBlQgKa5evowegULhojsQjBOMEwGLFYiVVSaZg6XqMPKAIwAZgpAF92uTKdTaZ10AzMEyNSAAAoVKoRbA3MDwCzx3SmAAsKBeuReWhe6Be+FIACEiChnLKhM4IQBNXymcvOIsAR2cAE5GAAraKGZwAEQAii881BpcZnEIXt3jABWJO+ZwwZz4l6kKz6aLcZy+KyVgBMM44ee4xkYhkML07ViIhigvnLefx9GwKGvWmcUGcz5xeBd+jc2HQdelvgAWg4F5oidF5nAACXsQxpWwZw8wABggAAOXxSysOtXHQXIAGoIOvXpnFDbtnBeMAAC1PAA3AACkk1DSB9FcFtDC0dM8wbYw4M8E9ZVMFAtEMUwADF9FwFgIJeBCIInFBDDANlImwRhnAAVSsAAvF5eiyIRDAqVSvy7fDnBYKBuyTdAWHIqx8S0PMLheDSYBo8sIPI8t9DzHDjH0BDuBwmB9BoutyIolhGHscduBs7tcEMJ1GH0ctTAgPNhOcJ0APoGxOxbIgEMYAB2L9cjnTBz1wOs62iX8ADYcKgPNohwp1yJdYTO0MVTGE7ZwUpbL881INtXHwMBXAADU3JMWBdHCXhovNy1DTcENILQIKMlVeX5EMhRFWhxUlGU5RDBF1W5VVYHlCCIFwfQiBgWFrV9O1-TQdB5QQj0vQpG0-XpRl5VMeQzqu3b5QOy7jqlWUocVQ6rsgG6Q31ZwrhYGGfVte1Pu+37dG9AH3qBoMQbBna+QRpUVQlOGzpZBVaaO671SZ-V7E6XJSle3GPsdENxx+kBPSJ-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-ABQCQFgIghA5wUCYFwIQUglBm70GYOwbg-BhDiGvrIfvSh1DaH0MYcw1h7DOHcM7Lw-hgjhGiPQOIyRzhpGyPkYo5RUE1EaK0eRHReiDFGJMWYixVibF2IcU4lxbiPHOC8T4rIfiAlQCCSEsJESokxLiQkpJKS0kZKydgHJeSCkikSkykKlYFqk8xal6lGlmlWl2lOlulel+lBlhlRlxkshJlpk1w5kFklkVk1kNktkdk9kDkjlyITlIJzlcBLlIIbk8w7kHkIInkXk3luAPkYAvkfk-kAUgUQUwUIUoUYU4VJoEUkUUU0UMUsUcUEI8UCUt5iVSVyVKVqVxxaUmwGUcImUWU2UOUuUeUMZ+VnBBV95hVnBRU6xxVJVpV7BZV5U6xFVlV2M1UiANUtUdU9UDUjVnATUzULUrUsgbU7UHUnVGAXU3UPUvUfU-UA0g0Q0w10AI0o10AY040E1Nwk0U0bh01M0Xhs1c181C1yxi19Iy0K0q0a060G0m0W020O0TZu0AJe1+1B1fBh1R1x0CMp0Z1yoF0l0V1cA10N0t0d091kID1VIj0T0z1Wl4JGhr18Rb0tB71H1n1X131P1v1f0jEAMgMQNOwwMIMoMUAYM4MEMkMrAUM0MMMsMcM8NfACNsM3ASMyMKMqMaM6MGMmMWMbA2MOMIAuMeM+MBMhMRMxMJMpMZM5MFMlMohVNCANMtMdM9MDMjNjEkxTNXwVQLcKRogiRZxlcKBVcQ4A43dWYe4MBtcoBddMACZRZItotYt0B4t2AwsuhcAItRYgA",
        "[Flare]:___ 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-ksGwgDIZAA",
        "[Zoned Out]:___ N4IgdghgtgpiBcIDaAtA9mGATABAeQFcAXAXRABoQAzAGwgDc0AnAFRgA8iEQAeAIwB8qDNnzESPAPSCAOmH5MBclgAsYOAMoBhAKIA5HQH08AdQMAlQ3oCCAWR04A7hACWRAM44qzHETU4ABxgmKhgAYyIcKDRYMEiiNBx3IiYXAGt1PxgXJhwYTCgAT3JffxZrcwBxHRYrOyM8Sxt7DQA6HFVs3Oc3FzAAc0CIQs80KioAQg6yiura5oam+o0vGBgaTyJg1L4aQpwCMBoCMLT971z3GPUmGAgrsBKIMFwszV0DYzMdJfscCACASYaAgYTUmzUUCi+VBfX6e1acgUAmRFBARAgTH6MCIeEw3BSBDglBSLn62KYWgwWF6GHcABkXPQ4dwkMAZCAXFAAswMXETMwsBz4BzbBB2FyCFD6Sc0hzyBy9HgWMKOVQIBsYPKOQA1cwASQ0AGlrKrqBr3FqKBzILAzbZChoMUR9e5KrcIFtWCpnjqNUTtZzubzni64maAIwAZg5AF8SuygzymHyiAKmEKEByAArHU4dNAZMDwQylnB6AAs+v6WH6Kn6RH6ARcACEwvrrCa+NYsQBNRx6XvWDsAR2sAE4aAArSpaawAEQAiv0W1AjTprHx+oudABWCuOawwaz0-ouPAaSrsayOPD9gBMR5YLfYOhoWi0-XneDCWigjl7Ft6W8fVAJUawoGsCC3DQdwow0Ow0CIEcjUcABaFh+kqCN+msAAJcwtCNNBrBbAAGCAAA5HG7PAR1sIgsAAajwwDCmsbNF2sfowBQNI0PcAApCts0gDRbCnLQVFrFsxx0Ei0i-E09H1FQtD0AAxDR3HoPD+jIvC931LQwA0CByjQGhrAAVTwAAvfpCgIPgtGOayEIXVjrHoKBFwrIh6BQPB6RUFtDn6OyYEE3s8JQXsNBbJidA0Mj2CYmANEEkcUF4+gaHMXd2CCxd3C0CMaA0Xs9AgFsNOsCM0KoEx5ynMIyJoAB2BCsBPJhf3cEcR0qZCADYmKgFtKiYiMUCjDT5y0ayaHnawqqnBCWxcGdbACMBbAADXvCt6CjJj+kElte2ze8yJcFQ8I8wMlRVLNzU1QM9UNE0zUJK0FXAaArRFEA8PuDQwnyP6OS5ZNU31cNXrIuME2h4MU1DdNM2BvRJFNa0QGes11Xe-HPuNPHgeJy1A1tIGOVdawaCZKGkxDOJ4aIM0kZAeMcETGG2bTQUzRxvH-sJ16qZZsnvsli0Wdps1XXMZ4sBiQMBfR9mEeB3dud5-m0dTTHhTAAgaBocXlR+pgA1Jg1yaJ+WacB+1CjwZswBcDA8CoFhMWxF03Q9L1VF9f0Wc1uGdY5NCbuRvnUdhjHhde0WnutuWSf+mWKY5X6XbtV7QdKmIAhoHFsHnfIXEisB6VVxciWSdwNaN0MOa5hPDeT-lU+B2w0D4FwmaIQoM5e4GC-tr687e6n8cV17-axHEnU9V13TuUOfT2vpI-b7XOcR7uk8Fk3XrFCUoClHAZVOCebbtnOHdlynncX13l4DtfnU3kPghhz3pgNuvcwzH2BvrMgJJUjkmCFSF4tIwAMlVqyaBIAYDjHCB4DSzBGTMgGKyHu59+45jzGkAsRYSxlkrNWWs9ZGzNjbB2LsPZ+j9kHMOawY5JwzjnEuFca4Nxbh3PuQ8x5TznkvNeW8D4nwvjfB+L8P4-wASAiBMCEEoJQBgnBBCg9kKoQwlhHC+FCLEVIhRaitF6KMRYmxDiXEeJ8QEsJUSEBxKSWkiuOSCklLWBUmpTS2ldL6UMruYyplzLWEsjZeyjlnKuQIO5KC84vI+T8gFIKIUwoDEitFWK8VErJVSulTK2Vcr5UKsVUq5VKrVVqvVRqzVWrtS6tYHq9I+paAGkNUa41JrTVmvNRay1Vp6HWqRLalQdp7UOsdU651LrXVuvdR6n8i7A3MDAaI9BjwRG9mAD6r857T3+lHUMegpR8GCF3HmKNWZayFhme04pJTSllIXOmIApLPGxOvY+L9Z5O2zmfJ5VyoA3KYGaNC0Z9YPIuX3F5l8+jvLvp8jZ3zfkDAys6Y5wKs4L3OYfIgEKoUwrhafR5xtSEE1xl8s02LsQe1RT7KgthpYnJBUSsFqYyW3NenHeFidqUp2RdjelmKzTrxTE6VIoR8WO0JQfMB-LoUnx5ugzBoQIjuFwUwBuLx3BoJ5kAA",
        "[Spare Sword]:___ N4IgdghgtgpiBcIDaBlADhATjABCg7gPaYAmAuiADQgBmANhAG7EAqMAHgC4IgA8ARgD5UGbHiKkyvAPRCAOmAGZBClgAtcKAMIBRAHI6A+gHkA6gYBKhvQEEAsjpwBnNIU5OcnDTjUBLOpw4hDQ4EM4SJM6cvgDGANa+YADmQQCugTSYhFChOGAwWPwAnlGE+QB0OOowJWipdHRBYDi+gfitaqENnhq+mDhQvklqgRBgJJTO2TBqhPiTUGMQSbichDiZMKveThEbWTleuE5rFTgAQuk4+BCt5fc4pmoQnADkHl6+TgD8OACSbw8ACtUicprBnH5OJwSrtiCRKgBxLJOJyVap4XQGEzmHRWWwOHB1dwtQKJHowPrOIoNCAkDg4EFg8kxCBOY7THCg3Cs5r8XD0zC+RgwSKZbKk8oKJSCGVUECcLArTjGfI8TiYVJwagaoYrTBaMokVq+MpOAAywsSSR4SGAchAvigrkwirAnFM8Id8AddkI-H8rSKDsoDr0xhY3odNAgdHZIYdADULH8UABpGxR2ix+NUB2QWBZuxFFCKzh-JzIgqcGCYdRjROxrUJx3O4hu8vurMARgAzA6AL6Te2tl0dz2kLMABToqXiVUIcRgYHghjXOD0ABY-kkSMMkpwkmhfOcYn8bBn+DZMEkAJr4PS3mzngCONgAnHQgYitDYACIAIpJOcUBpjoNj8EkAE6AArJu+A2DANjmkkvjGCgiLsDY+DGPeABMiEsOc7A6HQWhaEkf7GDEWhQPgt7nOaNCEH8DFqDYUA2BxrSEE4vYoPYbgvmm+AALQsEkiLdkkNgABIWFoaaEDY5wAAwQAAHPgV7GC+dicCQADUskMUUNhTgBNhJGAABacSiU4ABSm5TpAKB2ECWhqHu5xvjoylxJRGZ6H8ahaHoABiKBOIwslJKpsmwX8WhgCgEAsDYhB0DYACqxgAF5JEUqT8Fos45QJ-4mTYjBQABm6cIwNnGOaaiXMk+UwI5t6yTZt4oOchk6CgqnsIZMAoI5L42bZjB0BYMHsM1AFOFo3Z0Cgt56BA5wRTY3aiTQph-kCMSqXQADsAkkMhmA0U4L4voinAvgAbIZUDnIihndjZvYRX+Wg5XQf42FtQICecvjfnYaBgHYAAaeGbowvaGUkjnnLeU54apvhqLJlUtuGkYINGOYwC2yaphmWYas2ebgNAlNkyAslsigMTLizoaju2YydpwWaqYOw4Ok6Y4CxOJBZno0iZozJNZjGcY80mKbpgrPrZqrLYFiz2sVjYdDCmrfOugLfxdqzIsgEOOAjhL-PutLsvy8TEbKxTVMa7TrMq7mvP61mFYWGMJDZC2TsW+6VtC6zMG2-bjttjHHpeqzcsK7zSv+97jPU5rdOambwes+zq3ZGgdAwDWJARX0JzmuHAFaicThR6nHZx8LosO+LXdSxn2tZx7pPawHZuF37E-50HzMh04KAwHQNCd5LsfW9rSdi+b47Dw6chHyABBesfY-FwzvPT1r5O64zZfaxXAIwFA22wDLjPR93W8OknFA6iFEkfUhpxgmjNM3cYtoAEgBgDQGgMAYjuAisQS0jBrS2hThvdOk5WYzjnHEBcS4VxrkMBubcu59yHmPKec8l5rx3gfE+V8H4vw-n-EBECYEIJQVgvBRCyFULoUwthXC+ACIwCIiRMiFEqI0TogxJiLE2IcS4oMNYfEBJ+heiJcSklpJyQUkpFS6ktI6T0gZYyplzKWWsnZByzlXIQHcp5bywE-IBSCjYEKYVIrRVivFRKMFkqpXSplbKeVCrFVKuVSqf5qq1Xqo1ZqrV2pJE6t1Xq-VBrDVGuNSa01ZrzUWstVa61NrbV2vtQ6x1TrnSujYG65o7paAek9F671PrfV+v9QGwNQbg0htDREsN4ZIxRmjDGWMcZ4wJkTB+C9WYWFfoQEUNgkGmjAD7Gmt8FQl3Xs7TgehUhQH5JgXudtd7fyHrg7WR8HSn0nMfVc64tw7j3GoA8R4TxnhsK9P4f40znF7B+DG+AtC3jQCpQglkEalRsCgdgfxEQxB0ABc8WgsAWSgAjdZvYYh6DUDuc4nBfxqXwDlfAjkbCOVehFN8WgigvhQLCsyetFna0RKbF+UBtlFzzvfXm1z3THNObWC5A4YFwIQUgpwKDMCQJIE4aBdsgA"
]; //TODO redo special strings
    
    @override
    AspectPalette palette = new AspectPalette()
        ..accent = "#ff9933"
        ..aspect_light = '#FEFD49'
        ..aspect_dark = '#FEC910'
        ..shoe_light = '#10E0FF'
        ..shoe_dark = '#00A4BB'
        ..cloak_light = '#FA4900'
        ..cloak_mid = '#E94200'
        ..cloak_dark = '#C33700'
        ..shirt_light = '#FF8800'
        ..shirt_dark = '#D66E04'
        ..pants_light = '#E76700'
        ..pants_dark = '#CA5B00';

    @override
    List<String> landNames = new List<String>.unmodifiable(<String>["Fire", "Sparks", "Passion", "Love", "Burning Forests"]);

    @override
    List<String> levels = new List<String>.unmodifiable(<String>["FIREY DUDE", "PASSIONATE SPARK", "BURNING IDIOT"]);

    @override
    List<String> handles = new List<String>.unmodifiable(<String>["Brad"]);


    @override
    List<String> fraymotifNames = new List<String>.unmodifiable(<String>['Burn', 'Fire', 'Spark', 'Blaze']);


    @override
    String denizenSongTitle = "Opera"; //lol, cuz light players never shut up;

    @override
    String denizenSongDesc = " A beautiful opera begins to be performed. It starts to really pick up around Act 4. The OWNER is strengthened and healed. The ENEMY is weakened and hurt. And that is all there is to say on the matter. ";


    @override
    List<String> denizenNames = new List<String>.unmodifiable(<String>['Sun']); //yes im lazy


    @override
    List<String> symbolicMcguffins = ["blaze","passion", "fire", "sparks"];

    @override
    List<String> physicalMcguffins = ["blaze","fire", "sparks", "lighter","sketchbook"];

    @override
    void initializeItems() {
        items = new WeightedList<Item>()
            ..add(new Item("FAQ",<ItemTrait>[ItemTraitFactory.ZAP, ItemTraitFactory.ASPECTAL,ItemTraitFactory.SMART,ItemTraitFactory.LUCKY],shogunDesc: "Questions to Ping JR About",abDesc:"Probably found it on a server in the Furthest Ring."))
            ..add(new Item("Flashlight",<ItemTrait>[ItemTraitFactory.PLASTIC, ItemTraitFactory.ASPECTAL,ItemTraitFactory.GLOWING,ItemTraitFactory.ZAP,ItemTraitFactory.LUCKY],shogunDesc: "Tube of Localised Sun"))
            ..add(new Item("Octet",<ItemTrait>[ItemTraitFactory.ASPECTAL,ItemTraitFactory.GLOWING,ItemTraitFactory.LUCKY,ItemTraitFactory.LEGENDARY,ItemTraitFactory.CRYSTAL],shogunDesc: "D13"))
            ..add(new Item("Horseshoe",<ItemTrait>[ItemTraitFactory.HORSESHOE, ItemTraitFactory.ASPECTAL, ItemTraitFactory.BLUNT],shogunDesc: "Horse Sneaker"))
            ..add(new Item("Rabbits Foot",<ItemTrait>[ItemTraitFactory.RABBITSFOOT, ItemTraitFactory.ASPECTAL],shogunDesc: "Rabbit Remains"))
            ..add(new Item("4 Leaf Clover",<ItemTrait>[ItemTraitFactory.PLANT, ItemTraitFactory.ASPECTAL,ItemTraitFactory.GLOWING,ItemTraitFactory.LUCKY],shogunDesc: "Plant of Luck +4"))
            ..add(new Item("8-Ball",<ItemTrait>[ItemTraitFactory.GLASS, ItemTraitFactory.ASPECTAL,ItemTraitFactory.SENTIENT],shogunDesc: "Worst Characters Only Quality",abDesc:"It seems this is never right. Ask again later or some shit."));

    }

    @override
    List<AssociatedStat> stats = new List<AssociatedStat>.unmodifiable(<AssociatedStat>[
        new AssociatedStat(Stats.ALCHEMY, 1.0, true),
        new AssociatedStat(Stats.FREE_WILL, 1.0, true),
        new AssociatedStat(Stats.POWER, 1.0, true),
        new AssociatedStat(Stats.SANITY, -1.0, true),
        new AssociatedStat(Stats.HEALTH, -1.0, true),
        new AssociatedStat(Stats.SBURB_LORE, 0.2, false) //yes, technically it's from an aspect, but it's not NORMAL.
    ]);

    Blaze(int id) :super(id, "Blaze", isCanon: true);

    @override
    String activateCataclysm(Session s, Player p) {
        return s.mutator.light(s, p);
    }

    @override
    void initializeThemes() {

        /*
        new Quest(""),
                new Quest(""),
                new Quest(""),
                new DenizenFightQuest("","","")
         */
        addTheme(new Theme(<String>["Blaze"])
            ..addFeature(FeatureFactory.LUCKYFEELING, Feature.HIGH)
            ..addFeature(FeatureFactory.CLACKINGSOUND, Feature.MEDIUM)
            ..addFeature(FeatureFactory.GLAMOROUSFEELING, Feature.HIGH)
            ..addFeature(FeatureFactory.JAZZSOUND, Feature.HIGH) //persona5 has changed the face of casinos for me for all time

            ..addFeature(new DenizenQuestChain("This is bullshit", [
                new Quest("I know what you're thinking. 'Oh no, this is one of those segments with WL just typing random stuff because he has extreme writer's block but has to redo aspect quests. YES. you're right."),
                new Quest("Y'know, blaze is a cool ass aspect. [REDACTED] gently offered her aspect for the breadolution to use. IIRC, Blaze and Flood was the last aspect pair we decided upon, replacing my placeholder Meat/Candy. The history of the Breadolution is pretty damn interesting. Unfortunately only six people can know all of it."),
                new Quest("Oh shit, I am suposed to make a denizen quest. brb"),
                new DenizenFightQuest("Through sheer luck the ${Quest.PLAYER1} manages to spin a lucky number on the final round, which is merely a spin on the wheel with the number it rests on determining your reward. Your  ${Quest.CONSORT} opponents shake your hand as they admit defeat, as ${Quest.DENIZEN} emerges from the shadows, ready to fight you at last.", "${Quest.DENIZEN} lies slain. The ${Quest.CONSORT} host congratulates you on your victory and presents you your second prize, a brand new car! Unfortunately it is subsequently stolen by your opponents, who drive off, never to be seen again.","Alas, the ${Quest.PLAYER1}’s meeting with ${Quest.DENIZEN} ends in failure. And though their strife may have ended poorly, they will be remembered for being the best damn contestant this game show ever had. They will also have a consolation prize invitation to try again whenever they want! And yes, I just copied the og scene. I'm that lazy. Whatever, this is a shitpost.")
            ], new DenizenReward(), QuestChainFeature.defaultOption), Feature.WAY_LOW)
            ,  Theme.HIGH);

    }
}
