import React from 'react';
import ImgAsset from '../resources'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import '../css/chapterPage.css'

//import component Bootstrap React
import { Card, Container, Row, Col , Button } from 'react-bootstrap'

function ChapterPage() {
    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            <Row>
                <Col md={10}>
                    <div className="titleSection">
                        <h1>Shadow Slave</h1>
                    </div>
                </Col>
                <Col md={2}>
                    <Button className="downloadSection"> 
                        <span>Download</span>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <div className='chapterSection'>
                        <h2>Chapter 1 : Nightmare Begins</h2>
                    </div>
                </Col>
            </Row>
            <hr className="m-4"></hr>
            <div>
                <textarea disabled='disabled' className='content' rows="20" cols="130">
                    A frail-looking young man with pale skin and dark circles under his eyes was sitting on a rusty bench across from the police station. He was cradling a cup of coffee in his hands — not the cheap synthetic type slum rats like him had access to, but the real deal. This cup of plant-based coffee, usually available only to higher rank citizens, had cost most of his savings. But on this particular day, Sunny decided to pamper himself.

                    After all, his life was coming to an end.

                    Enjoying the warmth of the luxurious drink, he raised the cup and savored the aroma. Then, tentatively, he took a small sip… and immediately grimaced.

                    "Ah! So bitter!"

                    Giving the cup of coffee an intense look, Sunny sighed and forced himself to drink some more. Bitter or not, he was determined to get his money's worth — taste buds be damned.

                    "I should have bought a piece of real meat instead. Who knew actual coffee is so disgusting? Well. It's going to keep me awake, at least."

                    He stared into the distance, dozing off, and then slapped himself in the face to wake up.

                    "Tsk. What a rip-off."

                    Shaking his head and cursing, Sunny finished the coffee and stood up. Rich people living in this part of the city were rushing past the small park on their way to work, staring at him with strange expressions. Looking haggard in his cheap clothes and from the lack of sleep, unhealthily thin and pale, Sunny was indeed out of his place here. Also, everyone seemed so tall. Watching them with a bit of envy, he tossed the cup into a garbage bin.

                    "I guess that's what three full meals a day would do to you."

                    The cup missed the bin by a wide margin and fell on the ground. Sunny rolled his eyes in exasperation, walked over and picked it up before carefully putting it in the trash. Then, with a slight grin, he crossed the street and entered the police station.

                    Inside, a tired-looking officer gave him a quick glance and frowned with obvious distaste.

                    "Are you lost, boy?"

                    Sunny looked around with curiosity, noting reinforced armor plates on the walls and poorly hidden turret nests in the ceiling. The officer, too, looked scruffy and mean. At least police stations remained the same wherever you go.

                    "Hey! I'm talking to you!"

                    Sunny cleared his throat.

                    "Uh, no."

                    Then he scratched the back of his head and added:

                    "As demanded by the Third Special Directive, I am here to surrender myself as a carrier of the Nightmare Spell."

                    The officer's expression instantly changed from irritated to wary. He looked the young man over once again, this time with piercing intensity.

                    "Are you sure you are infected? When did you start showing symptoms?"

                    Sunny shrugged.

                    "A week ago?"

                    The officer became visibly paler.

                    "Shit."

                    Then, with a hurried motion, he pressed a button on his terminal and bellowed:

                    "Attention! Code Black in the lobby! I repeat! CODE BLACK!"

                    ***
                </textarea>
            </div>
            <div className="buttonSection">
                <a href="">
                    <img src = {ImgAsset.icon_prev_chapter}
                    className="prev_chapter"
                    alt="prev chapter"
                    />
                </a>
                <a href="/story">
                    <img src = {ImgAsset.icon_browse_chapter}
                    className="browse_chapter"
                    alt="browse chapter"
                    />
                </a>
                <a href="">
                    <img src = {ImgAsset.icon_next_chapter}
                    className="next_chapter"
                    alt="next chapter"
                    />
                </a>
            </div>
        </Container>
        <Footer />   
        </div>
    );
}

export default ChapterPage;