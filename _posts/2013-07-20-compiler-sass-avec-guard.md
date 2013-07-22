---
layout: blog_entry
title: Compiler Sass avec un fichier Guard
published_date: 23 <br> Juil <br> 2013
published: true
---

J'aime coder, et pour cette raison j'aime gagner du temps dans mon workflow, comme je le fais avec [git en utilisant git-flow]({% post_url 2013-03-23-git-flow %}). J'ai donc chercher un moyen d'**automatiser la compilation de Sass** dans mes projets, et je suis tombé sur cette vidéo de [Jeffrey Way, _Guard is your best friend_](http://net.tutsplus.com/tutorials/tools-and-tips/guard-is-your-best-friend/).

En gros, on crée un fichier (Guardfile) à la racine de notre projet, qui contient différents paramètres, comme par exemple: le dossier contenant les fichiers Sass, le dossier où les fichiers CSS sont générés, et aussi quel type de compilation ( `compressed`, `nested`, ...).

Il devient alors très facile de compiler les fichiers __en exécutant une seule commande__. L'avantage est d'avoir notre configuration dans un fichier [Guard](https://github.com/guard/guard). Mais ce n'est pas tout, Guard a une multitude de plugins, comme [live reload](https://github.com/guard/guard-livereload) et autres.

## Installer Guard et son plugin Sass

La première fois, il va falloir installer [Ruby](http://rubyinstaller.org/) et [Ruby Gems](http://rubyinstaller.org/) sur votre système, s'ils ne le sont pas déjà. Quand c'est fait,  on installe Guard :
<pre><code class="bash no-style">$ gem install guard
6 gems installed
</code></pre>

Et ensuite, le [plugin Sass](https://github.com/hawx/guard-sass) :
<pre><code class="bash no-style">$ gem install guard-sass
1 gem installed
</code></pre>

## Créer le fichier Guard, et automatiser la compilation

Maintenant que Guard, et le plugin Sass sont installés, on crée le _Guardfile_ :

<pre><code class="bash no-style">$ guard init
21:18:07 - INFO - Writing new Guardfile to c:/wamp/www/jeromesmadja/Guardfile
21:18:08 - INFO - sass guard added to Guardfile, feel free to edit it
</code></pre>

_Guardfile_ est alors créé dans le dossier actuel, et son contenu devrait ressembler à ça :

    # A sample Guardfile
    # More info at https://github.com/guard/guard#readme

    guard 'sass', :input => 'sass', :output => 'css'

Deux options par défaut :
- `:input` où les fichiers Sass sont localisés dans le project
- `:output` où Guard compilera les fichiers css

Le plugin contient une [multitude d'autres options](https://github.com/guard/guard-sass#options). Par exemple pour minifier les fichiers css, il suffit d'ajouter : `:style => :compressed`.

Une fois que les paramètres sont corrects, il ne nous reste plus qu'une seule chose à faire, dire à Guard de regarder nos fichiers. Et pour ça il suffit de lancer :

<pre><code class="bash no-style">$ guard
21:19:04 - INFO - Guard uses TerminalTitle to send notifications.
21:19:04 - INFO - Guard is now watching at 'c:/wamp/www/jeromesmadja'
[1] guard(main)>
</code></pre>

Oui, c'est tout !
Guard commencera alors à regarder les fichiers Sass qui sont dans le dossier que l'on a défini, et les compilera dans le dossier `output`. Aussi simple que ça.

## Gagner encore plus de temps avec live reload

Pour faire une présentation rapide de _live reload_, si vous ne connaissez pas, c'est une extension de navigateur qui permet à la touche f5 de votre de clavier se reposer, et de ne pas se faire taper dessus toutes les 5 secondes. A chaque fois qu'une sauvegarde dans un fichier a lieu, _live reload_ rafraîchira la page automatiquement.

Il faut juste s'assurer que vous avez l'extension _live reload_ installé dans votre navigateur préféré. Si vous ne l'avez pas encore vous [pouvez la trouver ici](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-).

Pour installer le plugin _live reload_ pour Guard : 
<pre><code class="bash no-style">$ gem install guard-livereload
5 gems installed
</code></pre>

Pour l'ajouter au _Guardfile_ :
<pre><code class="bash no-style">$ guard init livereload
22:02:15 - INFO - livereload guard added to Guardfile, feel free to edit it
</code></pre>

Et le _Guardfile_ devrait maintenant contenir les paramètres pour _live reload_  :

    # A sample Guardfile
    # More info at https://github.com/guard/guard#readme

    guard 'sass', :input => 'css/scss', :output => 'css'

    guard 'livereload' do
      watch(%r{app/views/.+\.(erb|haml|slim)$})
      watch(%r{app/helpers/.+\.rb})
      watch(%r{public/.+\.(css|js|html)})
      watch(%r{config/locales/.+\.yml})
      # Rails Assets Pipeline
      watch(%r{(app|vendor)(/assets/\w+/(.+\.(css|js|html))).*}) { |m| "/assets/#{m[3]}" }
    end

Je ne connais pas Ruby, mais il faut juste modifier les expressions régulières pour lui dire les extensions de fichiers à regarder. Donc quelque chose comme ceci sera plus utile dans notre cas :

    guard 'livereload' do
      watch(%r{.+\.(html|css|js|)})
    end

A chaque fois qu'un fichier avec l'extension .html, .css, ou .js sera mis à jour, le navigateur rechargera la page. On peut donc voir les changements apparaître directement dans le navigateur quand le fichier CSS a été compilé. 

---------------------------------------

La première installation peut prendre un peu de temps, particulièrement s'il faut que vous installiez [Ruby](http://rubyinstaller.org/) et [Ruby Gems](http://rubyinstaller.org/), mais je pense que ça vaut vraiment le coup. Une fois que c'est installé, il est très facile de créer un nouveau _Guardfile_ pour vos nouveaux projets. Par exemple si votre structure est la même pour tous vos projets, vous avez juste à copier votre _Guardfile_ à la racine de votre nouveau projet, et lancer la commande `guard`, et BAM.

Guard peut donc se révéler un très bon outil pour gagner du temps, peut-être juste quelques minutes par jour, voire quelques heures par mois.
Si l'installation est douloureuse, [contactez moi](https://twitter.com/jeromesmadja), je serais très content de vous aider.
Guard ne se limite pas à Sass et _live reload_, si vous êtes intéressé, voici la [liste des plugins disponibles](https://github.com/guard/guard/wiki/List-of-available-Guards), ils n'y sont pas tous mais il y en a déjà un bon paquet, par exemple il y a en un pour LESS, ou encore pour Jekyll.

