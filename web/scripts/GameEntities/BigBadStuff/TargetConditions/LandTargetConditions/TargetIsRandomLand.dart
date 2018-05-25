import "../../../../SBURBSim.dart";
import 'dart:html';

//each potential target has a X% chance of being allowed
class TargetIsRandomLand extends TargetConditionLand {

    InputElement randomInput;
    @override
    String name = "IsRandom";

    Item crown;


    @override
    String descText = "<br><br><br><b>Is Random:</b><br>Each potential target has an X% chance of being targeted. <br><br>";
    @override
    String notDescText = "<br><br><br><b>Is NOT Random???:</br> Each potential target has an X% chance of being NOT targeted.  (why didn't you just change the number???)<br><br>";


    TargetIsRandomLand(SerializableScene scene) : super(scene){
    }




    @override
    TargetCondition makeNewOfSameType() {
        return new TargetIsRandomLand(scene);
    }

    @override
    void renderForm(Element div) {
        div.append(descElement);
        syncDescToDiv();

        DivElement me = new DivElement();
        div.append(me);
        renderNotFlag(me);


        LabelElement label = new LabelElement()..text = "Odds of Targeting Individual: $importantInt%";
        randomInput = new InputElement();
        randomInput.type = "range";
        randomInput.min = "0";
        randomInput.max = "100";
        randomInput.value = "$importantInt";
        me.append(label);
        me.append(randomInput);
        randomInput.onChange.listen((e) {
            syncToForm();
            label.text = "Odds of Targeting Individual: $importantInt%";
        });
        syncToForm();
    }

    @override
    void syncFormToMe() {
        randomInput.value = "$importantInt";
        syncFormToNotFlag();
    }

    @override
    void syncToForm() {
        importantInt  = int.parse(randomInput.value);
        syncNotFlagToForm();
        scene.syncForm();
    }
    @override
    void copyFromJSON(JSONObject json) {
        importantInt = (int.parse(json[ActionEffect.IMPORTANTINT]));
    }

    @override
    bool conditionForFilter(Land item) {
        //reject if it's bigger than important int. if int is small, most will be rejected
        return scene.session.rand.nextIntRange(0, 100) > importantInt;
    }
}