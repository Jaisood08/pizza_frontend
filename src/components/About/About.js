import "./About.css";

const About = () => {
  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, Helvetica, sans-serif",
        width: "80vw",
        margin: "auto",
      }}
    >
      <div class="container">
        <div
          class="col-12"
          style={{ color: "black", fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <h2 style={{ textAlign: "center" }}>Our story</h2>
          <p>
            Our storv We belleve in good. We launched Fresh Pan Pizza Best
            Excuse Awards on our Facebook fan page. Fans were given situations
            where they had to come up with wacky and fun excuses. The person
            with the best excuse won the Best Excuse Badge and won Pizzeria's
            vouchers. Their enthusiastic response proved that Pizzeria's Fresh
            Pan Pizza is the Tastiest Pan Pizza. <br />
            <br />
            Everl Ever since we launched the Tastiest Pan Pizza, ever, people
            have not been able to resist the softest, cheeslest, crunchiest,
            butterlest Domino's Fresh Pan Pizza. They have been leaving the
            stage in the middle of a performance and even finding excuses to be
            disqualified in a football match.
            <br />
            <br />
            We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan
            page. Fans were given situations where they had to come up with
            wacky and run excuses. The person with the best excuse won the Best
            Excuse Badge and won Domino's vouchers. Their enthusiastic response
            proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza,
            Evert.
          </p>
        </div>
      </div>
      <div class="container">
        <div class="col-5" style={{ margin: "auto", display: "contents" }}>
          <img class="fakeImage" src="1.png" alt="First image" />
        </div>
        <div
          class="col-7"
          style={{ color: "black", fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <b>Ingredients</b>
          <p>
            We're ruthless about goodness. We have no qualms about tearing up a
            day-old lettuce leaf (straight from the farm), or steaming a baby
            (carrot). Cut. Cut. Chop, Chop. Steam. Steam. Stir Stir. While
            they're still young and fresh - that's our motto. It makes the
            kitchen a better place.
          </p>
        </div>
      </div>

      <div class="container">
        <div
          class="col-7"
          style={{ color: "black", fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <b>Our Chefs</b>
          <p>
            They make sauces sing and salads dance. They create magic with
            skill, knowledge, passion, and stirring spoons (among other things).
            They make goodness so good, it doesn't know what to do with itself.
            We do though. We send it to you.
          </p>
        </div>
        <div class="col-5" style={{ margin: "auto", display: "contents" }}>
          <img class="fakeImage" src="2.png" alt="Second image" />
        </div>
      </div>

      <div class="container">
        <div class="col-5" style={{ margin: "auto", display: "contents" }}>
          <img class="fakeImage" src="3.png" alt="Third image" />
        </div>
        <div
          class="col-7"
          style={{ color: "black", fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <p>45 min delivery</p>
        </div>
      </div>
    </div>
  );
};

export default About;
