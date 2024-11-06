-- NOTE: THIS IS OUT OF DATE. WILL CHANGE WHEN RECONFIGURE HOW TO INPUT TOPICS IN DATABASE

-- MySQL dump 10.13  Distrib 9.0.1,for macos13.6 (x86_64)
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
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS,UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS,FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE,SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES,SQL_NOTES=0 */;

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
  `Title` varchar(255) DEFAULT NULL,
  `Author` varchar(255) DEFAULT NULL,
  `PublicationYear` int DEFAULT NULL,
  PRIMARY KEY (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Books`
--

LOCK TABLES `Books` WRITE;
/*!40000 ALTER TABLE `Books` DISABLE KEYS */;
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
INSERT INTO `Subtopics` VALUES (1,'Bodily Autonomy',13),(2,'Consent',13),(3,'Gestures',13),(4,'Image',13),(5,'Language',13),(6,'Parts',13),(7,'Birthday',18),(8,'Diwali',18),(9,'First Thanksgiving',18),(10,'Party',18),(11,'Holidays',18),(12,'Attention',22),(13,'Awareness',22),(14,'Cause and effect',22),(15,'Cognitive development',22),(16,'Cognitive dissonance',22),(17,'Cognitive flexibility',22),(18,'Creative thinking/solutions',22),(19,'Critical thinking',22),(20,'Deeper processing',22),(21,'Delayed gratification',22),(22,'Embodied cognition',22),(23,'Executive function',22),(24,'Inattention',22),(25,'Learning',22),(26,'Making decisions',22),(27,'Problem-solving',22),(28,'Reasoning and decision making skills',22),(29,'Stages of consciousness',22),(30,'Theory of mind',22),(31,'Activities',31),(32,'Beliefs',31),(33,'Competence',31),(34,'Customs',31),(35,'Differences',31),(36,'Food',31),(37,'Heritage',31),(38,'History',31),(39,'Identity',31),(40,'Indigenous Nations’',31),(41,'Memory',31),(42,'Pride',31),(43,'Sense of culture',31),(44,'Similarities',31),(45,'Traditions',31),(46,'Values',31),(47,'Being different',34),(48,'Comparisons',34),(49,'Embracing differences',34),(50,'Environments',34),(51,'Individual differences',34),(52,'Isn’t bad or wrong',34),(53,'Perspectives',34),(54,'Sociocultural differences',34),(55,'Challenging stereotypes',35),(56,'Colonization',35),(57,'Discrimination',35),(58,'Divorce',35),(59,'Genocide',35),(60,'Patriarchy',35),(61,'Prejudices',35),(62,'Racial discrimination',35),(63,'Racism',35),(64,'Sexual discrimination',35),(65,'Slavery',35),(66,'Stereotypes',35),(67,'Talking about difficult topics',35),(68,'Xenophobia',35),(69,'ADHD',36),(70,'Americans With Disabilities Act',36),(71,'Autism',36),(72,'Blindness',36),(73,'Cerebral palsy',36),(74,'Deafness',36),(75,'Diversity',36),(76,'Down syndrome',36),(77,'Dyslexia',36),(78,'Hearing aids',36),(79,'Language impairments',36),(80,'Limb differences',36),(81,'Nonverbal child and family',36),(82,'Prosthetics',36),(83,'Wheelchairs',36),(84,'Anger',43),(85,'Anxiety',43),(86,'Boredom',43),(87,'Curiosity',43),(88,'Embarrassment',43),(89,'Emotional expression',43),(90,'Emotional regulation',43),(91,'Empathy',43),(92,'Fear',43),(93,'Frustration',43),(94,'Gratitude',43),(95,'Guilt',43),(96,'Homesickness',43),(97,'Identifying emotions',43),(98,'Loneliness',43),(99,'Managing emotions',43),(100,'Optimism',43),(101,'Recognition of',43),(102,'Regulation of',43),(103,'Sadness',43),(104,'Separation anxiety',43),(105,'Shame',43),(106,'Worrying what others think',43),(107,'Adoption',49),(108,'Authoritarian parenting',49),(109,'Blended',49),(110,'Caring for each other',49),(111,'Chosen family',49),(112,'Connection',49),(113,'Different types of families',49),(114,'Dynamics',49),(115,'Extended family',49),(116,'Found',49),(117,'Functions',49),(118,'Generations',49),(119,'Honoring elders',49),(120,'Interactions',49),(121,'Love',49),(122,'Military families',49),(123,'New baby',49),(124,'New siblings',49),(125,'Parent-child relationships',49),(126,'Parent-child relationships in various species',49),(127,'Parenting styles',49),(128,'Parents protecting children',49),(129,'Relationships',49),(130,'Sibling relationships',49),(131,'Structures',49),(132,'Time',49),(133,'Assignment',58),(134,'Breaking norms',58),(135,'Breaking the binary',58),(136,'Constancy',58),(137,'Dysphoria',58),(138,'Expectations',58),(139,'Expression',58),(140,'Fluidity',58),(141,'Inclusive pronouns',58),(142,'Nonconformity',58),(143,'Norms',58),(144,'Pronoun diversity',58),(145,'Pronouns',58),(146,'Pronouns changing over time',58),(147,'Roles',58),(148,'Specific activities',58),(149,'Spectrum',58),(150,'Transgender',58),(151,'Transition',58),(152,'Transgender child',58),(153,'Adjectives',95),(154,'Almost every word has two \'oo\'s',95),(155,'Alternative rhyme scheme',95),(156,'Alliteration',95),(157,'Alphabet',95),(158,'Bilingual speaking',95),(159,'Communication',95),(160,'Definitions',95),(161,'Descriptive',95),(162,'Development',95),(163,'Disappearing \'R\'',95),(164,'Glossary',95),(165,'Helpful for teaching spelling',95),(166,'Learning the alphabet',95),(167,'Literal vs. figurative language',95),(168,'Meaning',95),(169,'Metaphors',95),(170,'Minimal but repetitive text',95),(171,'Minimal pairs',95),(172,'Phonemes',95),(173,'Pronunciation guide',95),(174,'Repetition',95),(175,'Rhyming',95),(176,'Rhythmic phrases',95),(177,'Semantic development',95),(178,'Sign language alphabet',95),(179,'Silly sounds',95),(180,'Similes',95),(181,'Sophisticated vocabulary',95),(182,'Sound effects',95),(183,'Sounds and spelling',95),(184,'Spoonerism',95),(185,'Upper vs. lowercase letters',95),(186,'Use of colors and font size to emphasize words',95),(187,'Useful for speech pathologist',95),(188,'Word learning',95),(189,'Word play',95),(190,'Word search',95),(191,'Word segmentation',95),(192,'Verbs',95),(193,'Visual/contextual word learning',95),(194,'Word object associations',95),(195,'Basic math',109),(196,'Counting',109),(197,'Doubling',109),(198,'Economics',109),(199,'Large number comprehension',109),(200,'Numbers',109),(201,'Number concepts',109),(202,'Episodic memory',111),(203,'memory loss',111),(204,'Code-switching',118),(205,'Mandarin Chinese,Taiwanese Hokkien,and English',118),(206,'Mandarin Chinese tones with comparable English examples',118),(207,'Spanish and English',118),(208,'Yiddish',118),(209,'Bold colors',134),(210,'Changing light',134),(211,'Color',134),(212,'Common region',134),(213,'Continuity',134),(214,'Engaging multiple senses',134),(215,'Figure-ground segregation',134),(216,'Foreground/background',134),(217,'Gestalt principles',134),(218,'Grouping',134),(219,'Hearing',134),(220,'Light',134),(221,'Motion',134),(222,'Motion perception',134),(223,'Ponzo illusion',134),(224,'Proximity',134),(225,'Relative size',134),(226,'Scene perception',134),(227,'Shadow',134),(228,'Similarity',134),(229,'Spotlight effect',134),(230,'Tactile sensations',134),(231,'Texture',134),(232,'Texture gradient',134),(233,'Vision',134),(234,'Visual attention',134),(235,'Use of color',134),(236,'Being yourself',182),(237,'Believing in yourself',182),(238,'Developing a positive self-concept',182),(239,'Younger kids\' sense of self is based on physical characteristics',182),(240,'Attachment/secure attachment',196),(241,'Belonging',196),(242,'Bullying',196),(243,'Communication difficulties',196),(244,'Cooperation',196),(245,'Developing positive relationships with others',196),(246,'Exclusion',196),(247,'Feeling left out',196),(248,'Finding your place',196),(249,'Finding your voice',196),(250,'Friendship',196),(251,'Helping others',196),(252,'Inclusivity',196),(253,'Insecure attachment',196),(254,'Isolation',196),(255,'Kindness',196),(256,'Learning to say no',196),(257,'Love languages',196),(258,'Making friends',196),(259,'Multiple types of communication',196),(260,'New relationships',196),(261,'Not wanting to hurt other people\'s feelings',196),(262,'Peer relationships',196),(263,'Popularity',196),(264,'Realizing others have fear',196),(265,'Social identity theory',196),(266,'Social justice',196),(267,'Social routines',196),(268,'Social skills',196),(269,'Social support',196),(270,'Sharing',196),(271,'Sharing knowledge',196),(272,'Showing love without using words',196),(273,'Shy child',196),(274,'Socialization',196),(275,'Speaking up yourself and others',196),(276,'Standing up for yourself and others',196),(277,'Staying connected',196),(278,'Taking care of people',196),(279,'Taking turns',196),(280,'Unconditional love',196),(281,'Understanding your place',196),(282,'Very one-sided relationship',196),(283,'What brings friends together and separates them',196),(284,'Withdrawn rejected child category',196);
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
  `TopicName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`TopicID`),
  UNIQUE KEY `TopicName` (`TopicName`)
) ENGINE=InnoDB AUTO_INCREMENT=220 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Topics`
--

LOCK TABLES `Topics` WRITE;
/*!40000 ALTER TABLE `Topics` DISABLE KEYS */;
INSERT INTO `Topics` VALUES (36,'(Dis)ability'),(2,'Acceptance'),(3,'Actions and consequences'),(4,'Activism'),(5,'Adaptation'),(6,'Advocacy'),(8,'Affection'),(7,'Aging'),(9,'Animal sounds'),(10,'Anthropomorphizing'),(11,'Beauty standards'),(12,'Biological sex'),(13,'Body'),(14,'Borders'),(15,'Bravery'),(16,'Breaking norms'),(17,'Categories'),(18,'Celebration'),(19,'Challenges in a new place'),(20,'Change'),(21,'Changing perspective'),(22,'Cognition'),(23,'Comfort'),(24,'Community'),(25,'Community support'),(26,'Comparison'),(27,'Competition'),(28,'Conflict'),(29,'Cooking'),(30,'Creativity'),(31,'Culture'),(32,'Daily tasks/activities'),(34,'Different'),(35,'Difficult topics'),(33,'Discontinuous development'),(38,'Diverse main character'),(37,'Diversity'),(39,'Dream big/following dreams'),(40,'Dreams'),(41,'Education'),(42,'Elaboration'),(43,'Emotions'),(44,'Empowerment'),(45,'Equality'),(46,'Ethnic diversity'),(47,'Everyone has their own skills'),(48,'Fairy tales'),(49,'Family'),(50,'Female empowerment'),(51,'Feminism'),(52,'First day of school'),(53,'First Nation'),(54,'Food'),(55,'Function of the skin'),(56,'Fundamental attribution error'),(57,'Gay marriage'),(58,'Gender'),(59,'Gestures'),(60,'Getting organized'),(61,'Good vs. evil'),(62,'Growing cycle'),(63,'Growing up'),(64,'Growth'),(65,'Have to use pictures to decipher meaning'),(66,'Heroism'),(67,'Holding a grudge'),(68,'Home'),(69,'Honoring traditions'),(71,'Hope'),(70,'Humor'),(72,'Ideas'),(73,'Identity'),(74,'Identity crisis'),(75,'Identity expression'),(76,'Imagination'),(77,'Imitating instrument sounds'),(78,'Immigration'),(79,'Includes additional resources'),(80,'Indigenous people'),(81,'Individual strengths'),(82,'Inhibition'),(83,'Inner beauty'),(84,'Inner strength'),(85,'Inspiring children/students'),(86,'Interconnected habitat'),(87,'Interesting mix of words and pictures'),(88,'Internal motivation to learn'),(89,'Intersectionality'),(90,'Introduces new concept'),(91,'It\'s okay to make mistakes'),(92,'Knock knock jokes'),(93,'Knowledge'),(94,'Labels'),(95,'Language'),(96,'Leaving comfort zone'),(97,'Legacy'),(98,'Library'),(99,'Life skills'),(100,'Listening'),(101,'Literal and concrete thinking style'),(102,'Major life events'),(103,'Majority of characters are white'),(104,'Makes more sense to someone who knows skateboarding'),(105,'Manners'),(106,'Masculinity'),(107,'Maslow’s hierarchy of needs (drives,needs,self-actualization)'),(108,'Matching'),(109,'Math'),(110,'Meaning'),(111,'Memory'),(112,'Military'),(113,'Moral development'),(114,'Moral-reasoning'),(116,'Moving'),(117,'Multiculturalism'),(118,'Multilingual text'),(119,'Multiple aspects of identity'),(120,'Multiple meanings'),(121,'Multiple ways to be a warrior'),(122,'Music'),(123,'Names have meaning'),(124,'Naming'),(125,'Not finishing what you start'),(126,'Object permanence'),(127,'Oral storytelling'),(128,'Outer beauty'),(129,'Parental guide'),(130,'Parody'),(131,'Patience'),(132,'Paying it forward'),(133,'People are multifaceted'),(134,'Perception'),(135,'Perfectionism'),(136,'Persistence'),(137,'Personal history'),(138,'Personal space'),(139,'Personal style'),(140,'Perspective'),(141,'Perspective-taking'),(142,'Picky eaters'),(143,'Pictures without words'),(144,'Playing to your strengths'),(145,'Positive psychology'),(146,'Positive reinforcement'),(147,'Power of knowledge/books'),(148,'Practice'),(149,'Pride in name'),(150,'Process of solving a mystery'),(151,'Promotes diversity'),(152,'Psychological condition'),(153,'Puberty'),(154,'Punctuation marks'),(155,'Race'),(156,'Racial diversity'),(157,'Racial style'),(158,'Relations of elements to each other'),(159,'Relationship changes with time'),(160,'Religious diversity'),(161,'Religious references'),(162,'Resilience'),(163,'Resolution'),(164,'Responsibility'),(165,'Revised nursery rhymes'),(166,'Rhythm'),(167,'Rituals'),(168,'Routine fixedness/adaptability'),(169,'Routines'),(170,'Science behind light'),(171,'Search strategies'),(172,'Seasonal activities'),(173,'Seasons'),(182,'Self'),(174,'Self-acceptance'),(175,'Self-concept'),(176,'Self-confidence'),(177,'Self-esteem'),(178,'Self-expression'),(179,'Self-identity'),(180,'Self-love'),(181,'Self-perception'),(183,'Selfishness'),(184,'Sensory processing challenges'),(185,'Sex roles'),(186,'Sex-typing'),(187,'Sexual attraction spectrum'),(188,'Shapes'),(189,'Shows the same rooms'),(190,'Similarity'),(191,'Skateboarding'),(192,'Skills'),(193,'Skin pigmentation'),(194,'Skin tone'),(195,'Sleep'),(196,'Social'),(197,'Socio communicative challenges'),(198,'Sociocultural expectations'),(199,'Sociocultural perspective'),(200,'Sometimes imperfect is just right'),(201,'Starting at a new school'),(202,'Starting school'),(203,'Storytelling'),(204,'Support'),(205,'Synesthesia'),(206,'Taking care of shared space'),(207,'Teachers’ impact on students\' lives'),(208,'Teaches children to find ways to shine during difficult times'),(209,'Teaching children animal sounds'),(210,'Telenovela cultural aspect'),(211,'Time'),(212,'Tolerance'),(213,'Traditions'),(214,'Transitions'),(215,'Tutorial on manners'),(216,'Two houses but same activities'),(217,'Uniqueness'),(218,'Values'),(115,'Women in nontraditional jobs'),(219,'You know best');
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

-- Dump completed on 2024-10-25 17:53:49
