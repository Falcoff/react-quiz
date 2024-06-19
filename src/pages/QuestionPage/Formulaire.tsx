import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../PathsEnum";
import { AnswerType } from "../../core/models/Question";
import "./form.css";

const Formulaire = ({getDataAfterValidate}: {getDataAfterValidate: (data: any)=> void}) => {
  const navigate = useNavigate();

  const [answersUser, setAnswersUser] = useState<AnswerType[]>([]);

  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hasAccept, setHasAccept] = useState(false);

  return (
    <div className="container">
      <div className="contact-content">
        <p className="invit-formulaire">
          Pour connaître ton score, complète les informations suivantes :
        </p>
        <div className="form-horizontal">
          <div className="input-field">
            <label
              className="control-label col-sm-2 label-input"
              //    for="nom"
            >
              Nom* :
            </label>
            <div className="col-sm-11">
              <input
                type="text"
                className="form-control"
                id="nom"
                // formControlName="nom"
                required
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                // [ngClass]="{ &apos;is-invalid&apos;: submitted && contactForm.controls[&apos;nom&apos;].errors }"
              />
              {/* @if (submitted && contactForm.controls[&apos;nom&apos;].errors){" "}
            {
              <div className="invalid-feedback">
                @if (contactForm.controls[&apos;nom&apos;].errors[&apos;required&apos;]){" "}
                {<div>Le nom est obligatoire</div>}
              </div>
            } */}
            </div>
          </div>
          <div className="input-field">
            <label
              className="control-label col-sm-2 label-input"
              //   for="prenom"
            >
              Prénom* :
            </label>
            <div className="col-sm-11">
              <input
                type="text"
                className="form-control"
                id="prenom"
                // formControlName="prenom"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.currentTarget.value)}
                // [ngClass]="{ &apos;is-invalid&apos;: submitted && contactForm.controls[&apos;prenom&apos;].errors }"
              />
              {/* @if (submitted && contactForm.controls[&apos;prenom&apos;].errors){" "}
            {
              <div className="invalid-feedback">
                @if (contactForm.controls[&apos;prenom&apos;].errors[&apos;required&apos;]){" "}
                {<div>Le prénom est obligatoire</div>}
              </div>
            } */}
            </div>
          </div>
          <div className="input-field">
            <label
              className="control-label col-sm-2 label-input"
              //    for="email"
            >
              Email* :
            </label>
            <div className="col-sm-11">
              <input
                type="email"
                className="form-control"
                id="email"
                // formControlName="email"
                required
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                // [ngClass]="{ &apos;is-invalid&apos;: submitted && contactForm.controls[&apos;email&apos;].errors }"
              />
              {/* @if (submitted && contactForm.controls[&apos;email&apos;].errors){" "}
            {
              <div className="invalid-feedback">
                @if (contactForm.controls[&apos;email&apos;].errors[&apos;required&apos;]){" "}
                {<div>L&apos;email est obligatoire</div>} @if
                (contactForm.controls[&apos;email&apos;].errors){" "}
                {<div>Email incorrecte</div>}
              </div>
            } */}
            </div>
          </div>
          <div className="input-field">
            <label
              className="control-label col-sm-2 label-input"
              //   for="tel"
            >
              Téléphone* :
            </label>
            <div className="col-sm-11">
              <input
                type="tel"
                pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
                className="form-control"
                id="tel"
                // formControlName="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
                // [ngClass]="{ &apos;is-invalid&apos;: submitted && contactForm.controls[&apos;tel&apos;].errors }"
              />
              {/* @if (submitted && contactForm.controls[&apos;tel&apos;].errors){" "}
            {
              <div className="invalid-feedback">
                @if (contactForm.controls[&apos;tel&apos;].errors[&apos;required&apos;]){" "}
                {<div>Le téléphone est obligatoire</div>} @if
                (contactForm.controls[&apos;tel&apos;].errors){" "}
                {<div>Téléphone incorrecte</div>}
              </div>
            } */}
            </div>
          </div>

          <div className="demande-autorisation">
            <span>
              Nous autorises-tu à conserver tes données personnelles afin de
              pouvoir échanger à propos de ton avenir, ou t&apos;inviter à nos
              évènements? **
            </span>
            <div className="form-check">
              <label
                className="form-check-label accord-donnees"
                // for="accept"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="autorisations"
                  id="accept"
                  // formControlName="accord"
                  checked={hasAccept}
                  onChange={() => {
                    setHasAccept(!hasAccept);
                  }}
                />
                J&apos;accepte
              </label>
            </div>
          </div>

          <div className="col-sm-offset-2 col-sm-10 button-submit">
            <button
              type="button"
              className="btn btn-warning btn-quit"
              onClick={(e) => navigate(PathEnum.HOME)}
            >
              Quitter
            </button>

            <button
              type="submit"
              style={{ marginLeft: "8px" }}
              className="btn btn-quit btn-warning"
              disabled={!email || !name || !firstname || !phone}
              onClick={() =>
                getDataAfterValidate({name, firstname, email, phone, hasAccept})
              }
            >
              Valider
            </button>
          </div>
          {/* <br> */}
          <div className="infos-legales">
            <span>
              * Champs obligatoires
              <br />
              <br />
              ** Vos données personnelles seront utilisées uniquement par les
              personnes en charge des Ressources Humaines chez CREATIVE. Elles
              pourront vous contacter dans le cadre d&apos;opportunités
              professionnelles que pourraient vous offrir le Groupe, et pour
              vous inviter à nos événements.
              <br />
              Vos données seront conservées pendant 3 ans. Vous disposez
              d&apos;un droit de consultation, de rectification et de
              suppression en vous adressant à cette adresse
              <a href="mailto:dpo@groupe-creative.fr">dpo</a>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulaire;
