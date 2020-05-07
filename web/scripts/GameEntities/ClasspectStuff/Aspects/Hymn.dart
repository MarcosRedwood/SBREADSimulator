import '../../../SBURBSim.dart';
import 'Aspect.dart';
import "../../../Lands/FeatureTypes/QuestChainFeature.dart";
import "../../../Lands/Reward.dart";
import "../../../Lands/Quest.dart";

class Hymn extends AspectWithSubAspects {

    //what sort of quests rewards do I get?
    @override
    double itemWeight = 1.0;
    @override
    double fraymotifWeight = 1.0;
    @override
    double companionWeight = 1.00;



    @override
    AspectPalette palette = new AspectPalette()
        ..accent = '#E5BB06'
        ..aspect_light = '#FFF775'
        ..aspect_dark = '#E5BB06'
        ..shoe_light = '#508B2D'
        ..shoe_dark = '#316C0D'
        ..cloak_light = '#BF2236'
        ..cloak_mid = '#A81E2F'
        ..cloak_dark = '#961B2B'
        ..shirt_light = '#DD2525'
        ..shirt_dark = '#A8000A'
        ..pants_light = '#B8151F'
        ..pants_dark = '#8C1D1D';


    @override
    List<String> landNames = new List<String>.unmodifiable(<String>["Hymn"]);

    @override
    List<String> levels = new List<String>.unmodifiable(<String>["GLORY", "GLORY", "GLORY"]);


    @override
    List<String> handles = new List<String>.unmodifiable(<String>["Hymn"]);


    @override
    List<String> fraymotifNames = new List<String>.unmodifiable(<String>["Hymn"]);


    @override
    String denizenSongTitle = "Hymn"; //a sine wave is a flat sound, good idea tg

    @override
    String denizenSongDesc = " Yo wtf is that the USSR anthem ";

    @override
    List<String> denizenNames = new List<String>.unmodifiable(<String>['Purity']);

    @override
    List<String> symbolicMcguffins = ["purity", "sameness", "flatness", "unity", "stability", "plainness"];
    @override
    List<String> physicalMcguffins = ["hymn"];

    @override
    void initializeItems() {
        items = new WeightedList<Item>()
            ..add(new Item("Apple Juice Bottle",<ItemTrait>[ItemTraitFactory.EDIBLE, ItemTraitFactory.ASPECTAL,ItemTraitFactory.MAGICAL, ItemTraitFactory.REAL],abDesc:"It's probably science powered.",shogunDesc: "Shitty Wizard Pencil"));
    }

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
    List<AssociatedStat> stats = new List<AssociatedStat>.unmodifiable(<AssociatedStat>[
        new AssociatedStat(Stats.SANITY, 26.0, true),
        new AssociatedStat(Stats.MAX_LUCK, 13.0, true),
        new AssociatedStatRandom(Stats.pickable, -26.0, true)
    ]);

    Hymn(int id) :super(id, "Hymn", isInternal: true); //secret

    @override
    String activateCataclysm(Session s, Player p) {
        return s.mutator.hope(s, p);
    }


    //tg wrote this
    @override
    void initializeThemes() {

        addTheme(new Theme(<String>["Hymn"])

            ..addFeature(new DenizenQuestChain("Unite. ", [
                new Quest("Unite."),
                new Quest("Unite."),
                new Quest("Unite.")
            ], new DenizenReward(), QuestChainFeature.defaultOption), Feature.MEDIUM)
            ,  Theme.HIGH);
    }

  @override
  void setSubAspectsFromPlayer(Player player) {
      super.setSubAspectsFromPlayer(player);

      subAspects = new List<Aspect>.from(player.session.aspectsIncluded());

  }
}