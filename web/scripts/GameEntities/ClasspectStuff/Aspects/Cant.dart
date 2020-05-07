import '../../../SBURBSim.dart';
import 'Aspect.dart';
import "../../../Lands/FeatureTypes/QuestChainFeature.dart";
import "../../../Lands/Reward.dart";
import "../../../Lands/Quest.dart";

//not  a real aspect, it's just a shitty fucking clone of rage
class Cant extends AspectWithSubAspects {

    //what sort of quests rewards do I get?
    @override
    double itemWeight = 13.00;
    @override
    double fraymotifWeight = 13.0;
    @override
    double companionWeight = 13.0;


    @override
    AspectPalette palette = new AspectPalette()
        ..accent = "#00ff00"
        ..aspect_light = '#00ff00'
        ..aspect_dark = '#00ff00'
        ..shoe_light = '#00ff00'
        ..shoe_dark = '#00cf00'
        ..cloak_light = '#171717'
        ..cloak_mid = '#080808'
        ..cloak_dark = '#080808'
        ..shirt_light = '#616161'
        ..shirt_dark = '#3b3b3b'
        ..pants_light = '#4a4a4a'
        ..pants_dark = '#292929';


    @override
    List<String> levels = new List<String>.unmodifiable(<String>["NO", "NO", "NO"]);


    @override
    List<String> handles = new List<String>.unmodifiable(<String>["Lmao"]);

    @override
    bool isThisMe(Aspect other) {
        //don't call isThisMe on subasepct cuz you'll risk an infinite loop if subaspect is also something weird
        if(subAspects == null) {
            return other == this;
        }
        return other == this ||subAspects.contains(other);
    }

    @override
    bool isThisMyName(String other) {
        if (other == this.name) {
            return true;
        }
        for(Aspect a in subAspects) {
            if(other == a.name) {
                return true;
            }
        }
        return false;
    }

    @override
    List<String> fraymotifNames = new List<String>.unmodifiable(<String>["Cant"]);


    @override
    String denizenSongTitle = " Cant"; // ow my ears;

    @override
    String denizenSongDesc = " WL: idk I have to check with the breadolution ppl to see what does cant do ";

    @override
    List<String> denizenNames = new List<String>.unmodifiable(<String>['Corruption']);

    @override
    List<String> symbolicMcguffins = ["rebellion", "individual", "solo", "righteousness", "cant"];
    @override
    List<String> physicalMcguffins = ["cant"];


    @override
    void initializeItems() {
        items = new WeightedList<Item>() //TODO manage cant stuff
            ..add(new Item("Uno Reverse Card",<ItemTrait>[ItemTraitFactory.CARD, ItemTraitFactory.ASPECTAL, ItemTraitFactory.FAKE,ItemTraitFactory.SAUCEY]))
            ..add(new Item("JR Body Pillow",<ItemTrait>[ItemTraitFactory.PILLOW, ItemTraitFactory.COMFORTABLE, ItemTraitFactory.ASPECTAL,ItemTraitFactory.SAUCEY]));

    }

    @override
    List<AssociatedStat> stats = new List<AssociatedStat>.unmodifiable(<AssociatedStat>[
        new AssociatedStat(Stats.FREE_WILL, 13.0, true),
        new AssociatedStat(Stats.SBURB_LORE, 13.0, true),
        new AssociatedStat(Stats.ALCHEMY, 13.0, true),
        new AssociatedStat(Stats.RELATIONSHIPS, -13.0, true)
        ]);

    Cant(int id) :super(id, "Cant", isInternal: true);

    @override
    String activateCataclysm(Session s, Player p) {
        return s.mutator.rage(s, p);
    }

    //tg wrote this
    @override
    void initializeThemes() {

        addTheme(new Theme(<String>["Rebel"])

            ..addFeature(new DenizenQuestChain("Just do it.", [
                new Quest("The ${Quest.PLAYER1} has had enough. Enough of their denizen, enough of their land, enough of this bllshit game. They can do nothing but rebel. Rebel and bring change. Did you really think Bread was the aspect of revolution?"),
                new Quest("I must admit. I am impressed. Impressed you went out of your way to find this. Except if you're just going thru the commits in GitHub. But oh well, I can't do anythig about that. Anyway. The ${Quest.PLAYER1} is managing to bring change. Unfortunately, though, they hurt everyone in the process. Stand still and grab your popcorn, you're about to experience personal growth."),
                new Quest("Only after an undefined amount of time, the ${Quest.PLAYER1} manages to notice how much their actions hurt everyone around them. The ${Quest.PLAYER1} confronts a choice: either help fix the damage, and take a second try at the revolution, or finish what they have begun and kill the denizen. They choose the first option. When they finish fixing things uo, they discover their denizen was so moved by their growth, the denizen decided that their job here was done. The ${Quest.PLAYER1} has fixed their mistakes, and are ready to grow into a better person. <br> <br> Join the revolution.")
            ], new DenizenReward(), QuestChainFeature.defaultOption), Feature.MEDIUM)
            ,  Theme.HIGH);
    }

  @override
  void setSubAspectsFromPlayer(Player player) {
        super.setSubAspectsFromPlayer(player);
    subAspects = new List<Aspect>.from(player.session.aspectsLeftOut());
  }
}