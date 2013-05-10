---
layout: blog_entry
title: Pr&eacute;pocesseurs CSS
published_date: 07 <br> Avr <br> 2013
---

Ces derniers mois, j'ai lu une bonne quantité d'articles sur les pré-processeurs CSS, particulièrement dans la communauté francophone. Certain d'entre eux mettaient en avant les avantages, d'autres les inconvénients. De très bons arguments des 2 deux côtés.

Personnellement, j'utilise SASS, que ce soit pour de simples projets ou de plus gros projets. Il faut dire qu'une fois qu'on y est habitué c'est difficile de s'en détacher. Je ne recommanderai jamais d'utiliser les préprocesseurs à quelqu'un débutant en css, il faut toujours garder à l'esprit ce qui sera généré.

## Variables

Le fait de pouvoir définir des variables a divers avantages. Il aide à la maintenabilité du code car il devient alors plus facile de mettre à jour le css. Il aide aussi à la cohérence et l'homogénéité.

J'utilise un fichier `settings.scss`, où tout les variables sont définies : couleurs, police, tailles des principaux containers, et de la police, url des dossiers pour les images, etc...

Il devient alors très facile de travailler une fois que ce fichier est mise en place, prenons un exemple rapide :
Il est impossible de se rappeler de codes héxa. Sans utiliser les préprocesseurs voici quelques solutions pour obtenir la couleur que l'on recherche :
- définir les couleurs au début du fichier css en commentaire
- chercher un autre élément utilisant la même couleur
- copier la couleur à partir d'un autre élément dans le dev tool de votre navigateur préféré.
En utilisant un préprocesseur, on peut facilement se rappeler des noms de couleurs que l'on a défini dans `settings.scss` :
`color : $color_link`

Cela évite aussi d'avoir plusieurs variations d'une même couleur dans un même site. Il m'est arrivé récemment de faire une intégration, le design avait 6 violets différents ( oui c'était la faute du designer).

## Nesting

Le nesting est pour moi, __la fonctionnalité manquante en css__, particulièrement pour les pseudo-éléments :

    #container #footer a { color: #BADA55; }
    #container #footer a:hover { color: #B00B13; }

Ça c'était en css, voyons le même exemple en utilisant SASS :

    #container #footer a {
        color: #BADA55;
        &:hover { color: #B00B13;  }
    }

C'est pour moi une des meilleurs fonctionnalités que les préprocesseurs nous offrent. __Dark side__ : Il faut toujours garder à l'esprit ce que le préprocesseur générera pour nous. Sinon il est facile de se perdre dans le nesting, et d'avoir des sélecteurs de ce genre :

    #container #col_left .article .inner ul > li > a > span {}


## Travail en équipe
