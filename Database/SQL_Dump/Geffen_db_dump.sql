-- MySQL dump 10.13  Distrib 9.0.1, for macos13.6 (x86_64)
--
-- Host: localhost    Database: Geffen_db
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Book_Topics`
--

DROP TABLE IF EXISTS `Book_Topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Book_Topics` (
  `ISBN` varchar(13) NOT NULL,
  `TopicID` int NOT NULL,
  PRIMARY KEY (`ISBN`,`TopicID`),
  KEY `TopicID` (`TopicID`),
  CONSTRAINT `book_topics_ibfk_1` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`),
  CONSTRAINT `book_topics_ibfk_2` FOREIGN KEY (`TopicID`) REFERENCES `Topics` (`TopicID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Book_Topics`
--

LOCK TABLES `Book_Topics` WRITE;
/*!40000 ALTER TABLE `Book_Topics` DISABLE KEYS */;
INSERT INTO `Book_Topics` VALUES ('9780062097170',219),('9780590960755',219),('9780807119464',219),('9781250245625',219),('9781596435124',219),('9781368053433',221),('9781534146259',222),('9780316435161',223),('9781534111127',224),('9781534146250',225),('9780063228658',226),('9798855080247',227),('9781534111134',228),('9781623542658',229),('9781663621665',230),('9781416985952',231),('9780593430002',232),('9781433819186',233),('9781405919258',234),('9780142410585',235);
/*!40000 ALTER TABLE `Book_Topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Books`
--

DROP TABLE IF EXISTS `Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Books` (
  `ISBN` varchar(13) NOT NULL,
  `Title` longtext,
  `Author` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Books`
--

LOCK TABLES `Books` WRITE;
/*!40000 ALTER TABLE `Books` DISABLE KEYS */;
INSERT INTO `Books` VALUES ('9780062097170','A picture for Harold\'s room','Crockett Johnson'),('9780063228658','A Hundred thousand welcomes','Mary Lee Donovan'),('9780142410585','amazing you','gail saltz'),('9780316435161','A Computer Called Katherine','Suzanne Slade'),('9780590960755','amelia and eleanor go for a ride','pam munoz-ryan'),('9780593430002','All are neighbors','Alexandra Penfold'),('9780807119464','a band of angels','deboran hopkinson'),('9781250245625','A is for awesome: 23 iconic women who changed the world','Eva Chen'),('9781368053433','7 ate 9: the untold story','Tara Lazar'),('9781405919258','Always with you, always with me','Kelly Rowland and Jessica McKay'),('9781416985952','Alexander and the Terrible, Horrible, No Good, Very Bad Day','Judith Viorst'),('9781433819186','All my stripes','Shaina Rudolph and Danielle Royer'),('9781534111127','a friend like you','julia hubery'),('9781534111134','A teacher like you','Frank Murphy & Barbara Dan'),('9781534146250','A girl like you','Frank Murphy & Carla Murphy'),('9781534146259','A boy like you','Frank Murphy'),('9781596435124','a place where sunflowers grow','amy lee-tai'),('9781623542658','Abuelita and I make flan','Adrianna Hernandez Bergstrum'),('9781663621665','Abuelita\'s Heart','Amy Córdova'),('9798855080247','A spoonful of frogs','Casey Lyall');
/*!40000 ALTER TABLE `Books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Subtopics`
--

DROP TABLE IF EXISTS `Subtopics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Subtopics` (
  `SubtopicID` int NOT NULL AUTO_INCREMENT,
  `SubtopicName` varchar(100) DEFAULT NULL,
  `TopicID` int DEFAULT NULL,
  PRIMARY KEY (`SubtopicID`),
  UNIQUE KEY `SubtopicName` (`SubtopicName`),
  KEY `TopicID` (`TopicID`),
  CONSTRAINT `subtopics_ibfk_1` FOREIGN KEY (`TopicID`) REFERENCES `Topics` (`TopicID`)
) ENGINE=InnoDB AUTO_INCREMENT=285 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subtopics`
--

LOCK TABLES `Subtopics` WRITE;
/*!40000 ALTER TABLE `Subtopics` DISABLE KEYS */;
INSERT INTO `Subtopics` VALUES (1,'Bodily Autonomy',12),(2,'Consent',12),(3,'Gestures',12),(4,'Image',12),(5,'Language',12),(6,'Parts',12),(7,'Birthday',17),(8,'Diwali',17),(9,'First Thanksgiving',17),(10,'Party',17),(11,'Holidays',17),(12,'Attention',21),(13,'Awareness',21),(14,'Cause and effect',21),(15,'Cognitive development',21),(16,'Cognitive dissonance',21),(17,'Cognitive flexibility',21),(18,'Creative thinking/solutions',21),(19,'Critical thinking',21),(20,'Deeper processing',21),(21,'Delayed gratification',21),(22,'Embodied cognition',21),(23,'Executive function',21),(24,'Inattention',21),(25,'Learning',21),(26,'Making decisions',21),(27,'Problem-solving',21),(28,'Reasoning and decision making skills',21),(29,'Stages of consciousness',21),(30,'Theory of mind',21),(31,'Activities',30),(32,'Beliefs',30),(33,'Competence',30),(34,'Customs',30),(35,'Differences',30),(36,'Food',30),(37,'Heritage',30),(38,'History',30),(39,'Identity',30),(40,'Indigenous Nations’',30),(41,'Memory',30),(42,'Pride',30),(43,'Sense of culture',30),(44,'Similarities',30),(45,'Traditions',30),(46,'Values',30),(47,'Being different',33),(48,'Comparisons',33),(49,'Embracing differences',33),(50,'Environments',33),(51,'Individual differences',33),(52,'Isn’t bad or wrong',33),(53,'Perspectives',33),(54,'Sociocultural differences',33),(55,'Challenging stereotypes',34),(56,'Colonization',34),(57,'Discrimination',34),(58,'Divorce',34),(59,'Genocide',34),(60,'Patriarchy',34),(61,'Prejudices',34),(62,'Racial discrimination',34),(63,'Racism',34),(64,'Sexual discrimination',34),(65,'Slavery',34),(66,'Stereotypes',34),(67,'Talking about difficult topics',34),(68,'Xenophobia',34),(69,'ADHD',35),(70,'Americans With Disabilities Act',35),(71,'Autism',35),(72,'Blindness',35),(73,'Cerebral palsy',35),(74,'Deafness',35),(75,'Diversity',35),(76,'Down syndrome',35),(77,'Dyslexia',35),(78,'Hearing aids',35),(79,'Language impairments',35),(80,'Limb differences',35),(81,'Nonverbal child and family',35),(82,'Prosthetics',35),(83,'Wheelchairs',35),(84,'Anger',42),(85,'Anxiety',42),(86,'Boredom',42),(87,'Curiosity',42),(88,'Embarrassment',42),(89,'Emotional expression',42),(90,'Emotional regulation',42),(91,'Empathy',42),(92,'Fear',42),(93,'Frustration',42),(94,'Gratitude',42),(95,'Guilt',42),(96,'Homesickness',42),(97,'Identifying emotions',42),(98,'Loneliness',42),(99,'Managing emotions',42),(100,'Optimism',42),(101,'Recognition of',42),(102,'Regulation of',42),(103,'Sadness',42),(104,'Separation anxiety',42),(105,'Shame',42),(106,'Worrying what others think',42),(107,'Adoption',48),(108,'Authoritarian parenting',48),(109,'Blended',48),(110,'Caring for each other',48),(111,'Chosen family',48),(112,'Connection',48),(113,'Different types of families',48),(114,'Dynamics',48),(115,'Extended family',48),(116,'Found',48),(117,'Functions',48),(118,'Generations',48),(119,'Honoring elders',48),(120,'Interactions',48),(121,'Love',48),(122,'Military families',48),(123,'New baby',48),(124,'New siblings',48),(125,'Parent-child relationships',48),(126,'Parent-child relationships in various species',48),(127,'Parenting styles',48),(128,'Parents protecting children',48),(129,'Relationships',48),(130,'Sibling relationships',48),(131,'Structures',48),(132,'Time',48),(133,'Assignment',57),(134,'Breaking norms',57),(135,'Breaking the binary',57),(136,'Constancy',57),(137,'Dysphoria',57),(138,'Expectations',57),(139,'Expression',57),(140,'Fluidity',57),(141,'Inclusive pronouns',57),(142,'Nonconformity',57),(143,'Norms',57),(144,'Pronoun diversity',57),(145,'Pronouns',57),(146,'Pronouns changing over time',57),(147,'Roles',57),(148,'Specific activities',57),(149,'Spectrum',57),(150,'Transgender',57),(151,'Transition',57),(152,'Transgender child',57),(153,'Adjectives',94),(154,'Almost every word has two \'oo\'s',94),(155,'Alternative rhyme scheme',94),(156,'Alliteration',94),(157,'Alphabet',94),(158,'Bilingual speaking',94),(159,'Communication',94),(160,'Definitions',94),(161,'Descriptive',94),(162,'Development',94),(163,'Disappearing \'R\'',94),(164,'Glossary',94),(165,'Helpful for teaching spelling',94),(166,'Learning the alphabet',94),(167,'Literal vs. figurative language',94),(168,'Meaning',94),(169,'Metaphors',94),(170,'Minimal but repetitive text',94),(171,'Minimal pairs',94),(172,'Phonemes',94),(173,'Pronunciation guide',94),(174,'Repetition',94),(175,'Rhyming',94),(176,'Rhythmic phrases',94),(177,'Semantic development',94),(178,'Sign language alphabet',94),(179,'Silly sounds',94),(180,'Similes',94),(181,'Sophisticated vocabulary',94),(182,'Sound effects',94),(183,'Sounds and spelling',94),(184,'Spoonerism',94),(185,'Upper vs. lowercase letters',94),(186,'Use of colors and font size to emphasize words',94),(187,'Useful for speech pathologist',94),(188,'Word learning',94),(189,'Word play',94),(190,'Word search',94),(191,'Word segmentation',94),(192,'Verbs',94),(193,'Visual/contextual word learning',94),(194,'Word object associations',94),(195,'Basic math',108),(196,'Counting',108),(197,'Doubling',108),(198,'Economics',108),(199,'Large number comprehension',108),(200,'Numbers',108),(201,'Number concepts',108),(202,'Episodic memory',110),(203,'memory loss',110),(204,'Code-switching',117),(205,'Mandarin Chinese, Taiwanese Hokkien, and English',117),(206,'Mandarin Chinese tones with comparable English examples',117),(207,'Spanish and English',117),(208,'Yiddish',117),(209,'Bold colors',133),(210,'Changing light',133),(211,'Color',133),(212,'Common region',133),(213,'Continuity',133),(214,'Engaging multiple senses',133),(215,'Figure-ground segregation',133),(216,'Foreground/background',133),(217,'Gestalt principles',133),(218,'Grouping',133),(219,'Hearing',133),(220,'Light',133),(221,'Motion',133),(222,'Motion perception',133),(223,'Ponzo illusion',133),(224,'Proximity',133),(225,'Relative size',133),(226,'Scene perception',133),(227,'Shadow',133),(228,'Similarity',133),(229,'Spotlight effect',133),(230,'Tactile sensations',133),(231,'Texture',133),(232,'Texture gradient',133),(233,'Vision',133),(234,'Visual attention',133),(235,'Use of color',133),(236,'Being yourself',181),(237,'Believing in yourself',181),(238,'Developing a positive self-concept',181),(239,'Younger kids\' sense of self is based on physical characteristics',181),(240,'Attachment/secure attachment',195),(241,'Belonging',195),(242,'Bullying',195),(243,'Communication difficulties',195),(244,'Cooperation',195),(245,'Developing positive relationships with others',195),(246,'Exclusion',195),(247,'Feeling left out',195),(248,'Finding your place',195),(249,'Finding your voice',195),(250,'Friendship',195),(251,'Helping others',195),(252,'Inclusivity',195),(253,'Insecure attachment',195),(254,'Isolation',195),(255,'Kindness',195),(256,'Learning to say no',195),(257,'Love languages',195),(258,'Making friends',195),(259,'Multiple types of communication',195),(260,'New relationships',195),(261,'Not wanting to hurt other people\'s feelings',195),(262,'Peer relationships',195),(263,'Popularity',195),(264,'Realizing others have fear',195),(265,'Social identity theory',195),(266,'Social justice',195),(267,'Social routines',195),(268,'Social skills',195),(269,'Social support',195),(270,'Sharing',195),(271,'Sharing knowledge',195),(272,'Showing love without using words',195),(273,'Shy child',195),(274,'Socialization',195),(275,'Speaking up yourself and others',195),(276,'Standing up for yourself and others',195),(277,'Staying connected',195),(278,'Taking care of people',195),(279,'Taking turns',195),(280,'Unconditional love',195),(281,'Understanding your place',195),(282,'Very one-sided relationship',195),(283,'What brings friends together and separates them',195),(284,'Withdrawn rejected child category',195);
/*!40000 ALTER TABLE `Subtopics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Topics`
--

DROP TABLE IF EXISTS `Topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Topics` (
  `TopicID` int NOT NULL AUTO_INCREMENT,
  `TopicName` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`TopicID`),
  UNIQUE KEY `TopicName` (`TopicName`)
) ENGINE=InnoDB AUTO_INCREMENT=236 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Topics`
--

LOCK TABLES `Topics` WRITE;
/*!40000 ALTER TABLE `Topics` DISABLE KEYS */;
INSERT INTO `Topics` VALUES (35,'(Dis)ability'),(233,'(dis)ability:autism, socio communicative challenges, family:parent-child relationships, self-acceptance, self-concept, self-love'),(232,'(dis)ability:diversity, community, '),(1,'Acceptance'),(2,'Actions and consequences'),(3,'Activism'),(4,'Adaptation'),(227,'adaptation, language:verbs, language:repetition'),(5,'Advocacy'),(7,'Affection'),(6,'Aging'),(8,'Animal sounds'),(9,'Anthropomorphizing'),(10,'Beauty standards'),(11,'Biological sex'),(12,'Body'),(235,'body:image, body:parts, self-acceptance, self-love'),(13,'Borders'),(14,'Bravery'),(15,'Breaking norms'),(16,'Categories'),(17,'Celebration'),(18,'Challenges in a new place'),(19,'Change'),(20,'Changing perspective'),(21,'Cognition'),(22,'Comfort'),(23,'Community'),(24,'Community support'),(25,'Comparison'),(26,'Competition'),(27,'Conflict'),(28,'Cooking'),(29,'Creativity'),(30,'Culture'),(226,'culture:customs, culture:foods, culture:similarities, family:activities, family:time, racial diversity, ethnic diversity, religious diversity, (dis)ability:diversity, language:rhyming, multilingual text, perception:light, perception:proximity, social:inclusivity, social:sharing'),(221,'culture:similarities, culture:differences'),(31,'Daily tasks/activities'),(33,'Different'),(34,'Difficult topics'),(32,'Discontinuous development'),(37,'Diverse main character'),(36,'Diversity'),(38,'Dream big/following dreams'),(39,'Dreams'),(40,'Education'),(41,'Elaboration'),(42,'Emotions'),(231,'emotions:emotional regulation, emotions:managing emotions, family:dynamics, family:interactions'),(43,'Empowerment'),(219,'Empty Tag'),(44,'Equality'),(45,'Ethnic diversity'),(46,'Everyone has their own skills'),(47,'Fairy tales'),(48,'Family'),(234,'family:love, family:extended, women in nontraditional jobs        '),(222,'fear, social:cooperation, self-acceptance, self-identity'),(49,'Female empowerment'),(50,'Feminism'),(51,'First day of school'),(52,'First Nation'),(53,'Food'),(54,'Function of the skin'),(55,'Fundamental attribution error'),(56,'Gay marriage'),(57,'Gender'),(225,'gender:roles, social:speaking up for yourself and others, self-acceptance, self-expression, self-identity'),(58,'Gestures'),(59,'Getting organized'),(60,'Good vs. evil'),(61,'Growing cycle'),(62,'Growing up'),(63,'Growth'),(64,'Have to use pictures to decipher meaning'),(65,'Heroism'),(66,'Holding a grudge'),(67,'Home'),(68,'Honoring traditions'),(70,'Hope'),(69,'Humor'),(71,'Ideas'),(72,'Identity'),(73,'Identity crisis'),(74,'Identity expression'),(75,'Imagination'),(76,'Imitating instrument sounds'),(77,'Immigration'),(78,'Includes additional resources'),(79,'Indigenous people'),(80,'Individual strengths'),(81,'Inhibition'),(82,'Inner beauty'),(83,'Inner strength'),(84,'Inspiring children/students'),(85,'Interconnected habitat'),(86,'Interesting mix of words and pictures'),(87,'Internal motivation to learn'),(88,'Intersectionality'),(89,'Introduces new concept'),(90,'It\'s okay to make mistakes'),(91,'Knock knock jokes'),(92,'Knowledge'),(93,'Labels'),(94,'Language'),(95,'Leaving comfort zone'),(96,'Legacy'),(97,'Library'),(98,'Life skills'),(99,'Listening'),(100,'Literal and concrete thinking style'),(101,'Major life events'),(102,'Majority of characters are white'),(103,'Makes more sense to someone who knows skateboarding'),(104,'Manners'),(105,'Masculinity'),(106,'Maslow’s hierarchy of needs (drives, needs, self-actualization)'),(107,'Matching'),(108,'Math'),(109,'Meaning'),(110,'Memory'),(111,'Military'),(112,'Moral development'),(113,'Moral-reasoning'),(115,'Moving'),(116,'Multiculturalism'),(117,'Multilingual text'),(230,'multilingual text:Spanish and English, multilingual text:code-switching'),(229,'multilingual text:Spanish and English, multilingual text:code-switching, family, language:glossary, language:pronunciation guide'),(118,'Multiple aspects of identity'),(119,'Multiple meanings'),(120,'Multiple ways to be a warrior'),(121,'Music'),(122,'Names have meaning'),(123,'Naming'),(124,'Not finishing what you start'),(125,'Object permanence'),(126,'Oral storytelling'),(127,'Outer beauty'),(128,'Parental guide'),(129,'Parody'),(130,'Patience'),(131,'Paying it forward'),(132,'People are multifaceted'),(133,'Perception'),(134,'Perfectionism'),(135,'Persistence'),(136,'Personal history'),(137,'Personal space'),(138,'Personal style'),(139,'Perspective'),(140,'Perspective-taking'),(141,'Picky eaters'),(142,'Pictures without words'),(143,'Playing to your strengths'),(144,'Positive psychology'),(145,'Positive reinforcement'),(146,'Power of knowledge/books'),(147,'Practice'),(148,'Pride in name'),(149,'Process of solving a mystery'),(150,'Promotes diversity'),(151,'Psychological condition'),(152,'Puberty'),(153,'Punctuation marks'),(154,'Race'),(155,'Racial diversity'),(228,'racial diversity, religious diversity, (dis)ability:diversity'),(156,'Racial style'),(157,'Relations of elements to each other'),(158,'Relationship changes with time'),(159,'Religious diversity'),(160,'Religious references'),(161,'Resilience'),(162,'Resolution'),(163,'Responsibility'),(164,'Revised nursery rhymes'),(165,'Rhythm'),(166,'Rituals'),(167,'Routine fixedness/adaptability'),(168,'Routines'),(169,'Science behind light'),(170,'Search strategies'),(171,'Seasonal activities'),(172,'Seasons'),(181,'Self'),(173,'Self-acceptance'),(174,'Self-concept'),(175,'Self-confidence'),(176,'Self-esteem'),(177,'Self-expression'),(178,'Self-identity'),(179,'Self-love'),(180,'Self-perception'),(182,'Selfishness'),(183,'Sensory processing challenges'),(184,'Sex roles'),(185,'Sex-typing'),(186,'Sexual attraction spectrum'),(187,'Shapes'),(188,'Shows the same rooms'),(189,'Similarity'),(190,'Skateboarding'),(191,'Skills'),(192,'Skin pigmentation'),(193,'Skin tone'),(194,'Sleep'),(195,'Social'),(223,'social:finding your place, social:standing up for yourself and others, cognition:critical thinking, cognition:problem-solving'),(224,'social:friendship, social:connection, interconnected habitat'),(196,'Socio communicative challenges'),(197,'Sociocultural expectations'),(198,'Sociocultural perspective'),(199,'Sometimes imperfect is just right'),(200,'Starting at a new school'),(201,'Starting school'),(202,'Storytelling'),(203,'Support'),(204,'Synesthesia'),(205,'Taking care of shared space'),(206,'Teachers’ impact on students\' lives'),(207,'Teaches children to find ways to shine during difficult times'),(208,'Teaching children animal sounds'),(209,'Telenovela cultural aspect'),(210,'Time'),(211,'Tolerance'),(212,'Traditions'),(213,'Transitions'),(214,'Tutorial on manners'),(215,'Two houses but same activities'),(216,'Uniqueness'),(217,'Values'),(114,'Women in nontraditional jobs'),(218,'You know best');
/*!40000 ALTER TABLE `Topics` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-31 13:32:38
